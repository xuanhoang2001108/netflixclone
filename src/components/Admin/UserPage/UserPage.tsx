import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  useGetAllPermissionQuery,
  useGetAllUserQuery,
  useGetCurrentUserQuery,
  useGetRoleQuery,
} from "../../../store/service/getUser.service";
import TextField from "@mui/material/TextField";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDeleteAccountMutation } from "../../../store/service/register.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DialogContentText from "@mui/material/DialogContentText";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { Typography } from "@mui/material";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

interface UserData {
  email: string;
  userName: string;
  phoneNumber: string;
  roles: Array<{ name: string; id: string }>; 
  id: string;
}

export default function UserPage() {
  const accessToken = localStorage.getItem("accessToken") ?? "";
  const { data: currentUserData } = useGetCurrentUserQuery({ accessToken });

  const { data: permissionsOfUsers } = useGetAllPermissionQuery(
    currentUserData?.id ?? ""
  );

  const hasPermission = (permission: string) => {
    // Check if permissionsOfUsers is defined
    if (permissionsOfUsers) {
      // Explicitly assert the type to be an array of strings
      const permissionsArray = permissionsOfUsers as string[];
      return permissionsArray.includes(permission);
    } else {
      // Handle the case where permissionsOfUsers is undefined
      return false;
    }
  };

  const [deleteAccountMutation] = useDeleteAccountMutation();
  const { data: usersData, refetch } = useGetAllUserQuery();
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  useGetRoleQuery();

  const location = useLocation();
  const isParentRoute =
    location.pathname === "/AdminLoginPage/AdminPage/UserPage";

  const columns = [
    { field: "email", headerName: "Email", width: 200 },
    { field: "userName", headerName: "Username", width: 200 },
    { field: "phoneNumber", headerName: "Phone Number", width: 200 },
    {
      field: "roleNames",
      headerName: "User Role",
      width: 200,
    },
    {
      field: "edit",
      headerName: "",
      width: 20,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton
          color="primary"
          onClick={(event) => {
            if (hasPermission("Edit User")) {
              navigate(
                `/AdminLoginPage/AdminPage/UserPage/EditUser/${params.id}`
              );
            } else {
              console.log("Permission denied: Edit User");
            }
            event.stopPropagation();
          }}
          disabled={!hasPermission("Edit User")}
        >
          <EditIcon />
        </IconButton>
      ),
    },
    {
      field: "delete",
      headerName: "",
      width: 20,
      disableColumnMenu: true,
      sortable: false,
      renderCell: (params: any) => (
        <IconButton
          color="primary"
          onClick={(event) => {
            if (hasPermission("Delete User")) {
              handleDeleteConfirmation(params.id);
            } else {
              // You can show a message or take other actions when the user doesn't have the permission
              console.log("Permission denied: Delete User");
            }
            event.stopPropagation();
          }}
          disabled={!hasPermission("Delete User")}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const rows = usersData
    ? usersData.data.map((user: UserData) => {
        const userRoles = user.roles;
        const roleNames = userRoles.map((role: any) => role.name).join(", ");

        return {
          id: user.id,
          email: user.email,
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          roleNames: roleNames,
        };
      })
    : [];

  const handleDelete = async (id: string) => {
    try {
      await deleteAccountMutation(id);
      refetch();
      toast.success("User deleted successfully");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting user");
    } finally {
      setDeleteUserId(null);
    }
  };
  const handleDeleteConfirmation = (id: any) => {
    setDeleteUserId(id);
  };

  const handleCancelDelete = () => {
    setDeleteUserId(null);
  };

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  const filteredRows = rows.filter((row: UserData) => {
    const rowData = Object.values(row).join(" ").toLowerCase();
    return rowData.includes(searchQuery.toLowerCase());
  });

  return (
    <>
      <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
        {isParentRoute && (
          <>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography
                sx={{
                  fontSize: "h3.fontSize",
                  alignItems: "end",
                  marginRight: 92,
                }}
              >
                USER
              </Typography>

              <Button
                variant="contained"
                onClick={(event) => {
                  if (hasPermission("Delete User")) {
                    navigate("/AdminLoginPage/AdminPage/UserPage/CreateUser");
                  } else {
                    console.log("Permission denied: Add User");
                  }
                  event.stopPropagation();
                }}
                disabled={!hasPermission("Add User")}
              >
                CREATE NEW USER
              </Button>
            </Box>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchInputChange}
              sx={{ marginLeft: 77, mb: 2, width: 400 }}
              InputProps={{
                style: { color: "black" },
              }}
            />
            <DataGrid
              rows={filteredRows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
              sx={{
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
                  {
                    color: "black",
                  },
              }}
              onRowClick={(params: any) => {
                if (hasPermission("View User")) {
                  navigate(
                    `/AdminLoginPage/AdminPage/UserPage/ViewUser/${params.id}`
                  );
                }
              }}
              disableRowSelectionOnClick={!hasPermission("View User")}
            />
          </>
        )}

        <ToastContainer />
        <Dialog
          open={Boolean(deleteUserId)}
          onClose={handleCancelDelete}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Are you sure you want to delete this user?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button
              onClick={() => deleteUserId && handleDelete(deleteUserId)}
              color="primary"
              autoFocus
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
      <Outlet></Outlet>
    </>
  );
}
