import Box from "@mui/material/Box";
import {
  useGetAllUserQuery,
  useGetPermissionSetQuery,
  useGetRoleNameQuery,
  useGetRoleQuery,
} from "../../../store/service/getUser.service";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  Tab,
  Tabs,
  Typography,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDeleteRoleMutation } from "../../../store/service/register.service";
function ViewRole() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [value, setValueTab] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const [deleteRole, setDeleteRole] = React.useState<string | null>(null);
  const { refetch: refetchId } = useGetRoleNameQuery(roleId || "");
  const { refetch } = useGetRoleQuery();
  const [deleteRoleMutation] = useDeleteRoleMutation();
  const handleChange = (_event: any, newValue: any) => {
    setValueTab(newValue);
  };
  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleSelectionModelChange = (selection: any) => {
    setSelectedRows(selection);
  };
  const { data: permissionSetData } = useGetPermissionSetQuery();
  const { data: usernameHasPermission } = useGetAllUserQuery();
  const {
    data: roleData,
    error,
    isLoading,
  } = useGetRoleNameQuery(roleId || "");
  React.useEffect(() => {
    refetchId();
  }, [roleId]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!roleData) {
    return <Box>User not found</Box>;
  }
  const handleDeleteConfirmation = (id: any) => {
    setDeleteRole(id);
  };

  const handleCancelDelete = () => {
    setDeleteRole(null);
  };
  const handleDelete = async (id: string) => {
    try {
      await deleteRoleMutation(id);
      refetch();
      toast.success("Role deleted successfully");
      navigate("/AdminPage/RolePage");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting Role");
    } finally {
      setDeleteRole(null);
    }
  };
  const { permissionSetIds, userIds } = roleData;
  const rowTab0 = permissionSetIds.map((id) => {
    const matchedPermissionSet = permissionSetData?.data.find(
      (permissionSet: any) => permissionSet.id === id
    );

    return {
      id,
      name: matchedPermissionSet?.name || "",
      sort: matchedPermissionSet?.sort || 0,
    };
  });

  const rowTab1 = userIds.map((id) => {
    const matchedUsernameHasPermission = usernameHasPermission?.data.find(
      (UsernameHasPermission: any) => UsernameHasPermission.id === id
    );

    return {
      id,
      userName: matchedUsernameHasPermission?.userName || "",
    };
  });

  const filteredRowTab0 = rowTab0.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredRowTab1 = rowTab1.filter((row) =>
    row.userName.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h3">{roleData.name}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="contained"
            sx={{ ml: 72 }}
            onClick={() => navigate(`/AdminPage/RolePage/EditRole/${roleId}`)}
          >
            <CreateIcon sx={{ mr: 1 }}></CreateIcon> EDIT
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}  
            onClick={(event) => {
              handleDeleteConfirmation(roleId);
              event.stopPropagation();
            }}
          >
            <DeleteIcon sx={{ mr: 1 }}></DeleteIcon> DELETE
          </Button>
        </Box>
      </Box>
      <Typography variant="h5">Overview</Typography>
      <TextField
        id="outlined-read-only-input"
        value={roleData.name}
        InputProps={{
          readOnly: true,
        }}
        sx={{ input: { color: "black" }, ml: 2 }}
      ></TextField>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="wrapped label tabs example"
      >
        <Tab value={0} label="PERMISSIONSETS"></Tab>
        <Tab value={1} label="USERS" />
      </Tabs>
      <TextField
        label="Search"
        variant="outlined"
        sx={{ width: "100%" }}
        InputProps={{
          style: { color: "black" },
        }}
        value={searchText}
        onChange={handleSearchChange}
      />
      {value === 0 && (
        <Box>
          <Typography component="div">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">
                <DataGrid
                  rows={filteredRowTab0}
                  columns={[
                    {
                      field: "name",
                      headerName: "Name",
                      width: 200,
                    },
                    {
                      field: "sort",
                      headerName: "Sort",
                      width: 200,
                    },
                  ]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 100]}
                  onRowSelectionModelChange={handleSelectionModelChange}
                  rowSelectionModel={selectedRows}
                  sx={{ mb: 2,
                    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
                      {
                        color: "black",
                      },
                  }}
                />
              </Typography>
            </Box>
          </Typography>
        </Box>
      )}
      {value === 1 && (
        <Box>
          <Typography component="div">
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
              }}
            >
              <Typography variant="h6">
                <DataGrid
                  rows={filteredRowTab1}
                  columns={[
                    {
                      field: "userName",
                      headerName: "Name",
                      width: 400,
                    },
                  ]}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 100]}
                  onRowSelectionModelChange={handleSelectionModelChange}
                  rowSelectionModel={selectedRows}
                  sx={{
                    "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
                      {
                        color: "black",
                      },
                  }}
                />
              </Typography>
            </Box>
          </Typography>
        </Box>
      )}
      <Dialog
        open={Boolean(deleteRole)}
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
            onClick={() => deleteRole && handleDelete(deleteRole)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
      <ToastContainer />
    </Box>
  );
}

export default ViewRole;
