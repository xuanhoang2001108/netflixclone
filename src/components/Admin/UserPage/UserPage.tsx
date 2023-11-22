import Button from "@mui/material/Button";
import { DataGrid } from "@mui/x-data-grid";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import {
  useGetAllUserQuery,
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
  roleIds: string;
  id: string;
}

export default function UserPage() {
  const [deleteAccountMutation] = useDeleteAccountMutation();
  const { data: usersData, refetch } = useGetAllUserQuery();
  const [deleteUserId, setDeleteUserId] = React.useState<string | null>(null);
  const navigate = useNavigate();
  const location = useLocation();
  const { data: roleData } = useGetRoleQuery();

  const isParentRoute = location.pathname === "/AdminPage/UserPage";

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
            navigate(`/AdminPage/UserPage/EditUser/${params.id}`);
            event.stopPropagation();
          }}
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
            handleDeleteConfirmation(params.id);
            event.stopPropagation();
          }}
        >
          <DeleteIcon />
        </IconButton>
      ),
    },
  ];
  const rows = usersData
    ? usersData.data.map((user: UserData) => {
        const userRoles = roleData?.data.filter((r: any) =>
          r.userIds.includes(user.id)
        );
        const roleNames = userRoles
          ? userRoles.map((role: any) => role.name)
          : [];

        return {
          id: user.id,
          email: user.email,
          userName: user.userName,
          phoneNumber: user.phoneNumber,
          roleNames: roleNames.join(", "),
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
                onClick={() => {
                  navigate("/AdminPage/UserPage/CreateUser");
                }}
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
                navigate(`/AdminPage/UserPage/ViewUser/${params.id}`);
              }}
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
