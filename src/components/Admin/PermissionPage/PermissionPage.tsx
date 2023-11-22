import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPermissionQuery } from "../../../store/service/getUser.service";
import { Outlet, useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { ToastContainer, toast } from "react-toastify";
import React, { useState } from "react";
import { useDeletePermissionMutation } from "../../../store/service/register.service";
import { ViewPermissionData } from "../../../types/Movie";
function PermissionSetPage() {
  const { data: permissionData } = useGetPermissionQuery();
  const navigate = useNavigate();
  const [deletePermission, setDeletePermission] = React.useState<string | null>(
    null
  );
  const { refetch } = useGetPermissionQuery();
  const [deletePermissionMutation] = useDeletePermissionMutation();
  const isParentRoute = location.pathname === "/AdminPage/PermissionPage";
  const rows = permissionData
    ? permissionData.data.map((permission: any) => ({
        id: permission.id,
        name: permission.name,
        sort: permission.sort,
      }))
    : [];

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 200 },
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
            navigate(`/AdminPage/PermissionPage/EditPermission/${params.id}`);
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

  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };
  const filteredRows = rows.filter((row: ViewPermissionData) => {
    const rowData = Object.values(row).join(" ").toLowerCase();
    return rowData.includes(searchQuery.toLowerCase());
  });

  const handleNavigate = () => {
    navigate("/AdminPage/PermissionPage/CreatePermission");
  };

  const handleDeleteConfirmation = (id: any) => {
    setDeletePermission(id);
  };

  const handleCancelDelete = () => {
    setDeletePermission(null);
  };
  const handleDelete = async (id: string) => {
    try {
      await deletePermissionMutation(id);
      refetch();
      toast.success("Permission deleted successfully");
      navigate("/AdminPage/PermissionPage");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting Permission");
    } finally {
      setDeletePermission(null);
    }
  };
  return (
    <Box
      sx={{
        marginLeft: "20%",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      {isParentRoute && (
        <>
          {" "}
          <Typography component="div">
            {" "}
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h3"> Permissions</Typography>{" "}
              <Button
                variant="contained"
                sx={{ height: 40, ml: 63 }}
                onClick={handleNavigate}
              >
                + CREATE NEW PERMISSION
              </Button>
            </Box>
            <TextField
              label="Search"
              variant="outlined"
              value={searchQuery}
              onChange={handleSearchInputChange}
              sx={{ marginLeft: 76, mb: 2, width: 400 }}
              InputProps={{
                style: { color: "black" },
              }}
            />
            <Box
              sx={{
                display: "flex",
                flexWrap: "wrap",
                flexDirection: "column",
                mr: 20,
              }}
            >
              <Typography variant="h6">
                <DataGrid
                  rows={filteredRows}
                  columns={columns}
                  initialState={{
                    pagination: {
                      paginationModel: { page: 0, pageSize: 5 },
                    },
                  }}
                  pageSizeOptions={[5, 10, 100]}
                  onRowClick={(params) => {
                    navigate(
                      `/AdminPage/PermissionPage/ViewPermission/${params.id}`
                    );
                  }}
                  checkboxSelection
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
        </>
      )}
      <Dialog
        open={Boolean(deletePermission)}
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
            onClick={() => deletePermission && handleDelete(deletePermission)}
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
        <ToastContainer />
      </Dialog>
      <Outlet></Outlet>
    </Box>
  );
}

export default PermissionSetPage;
