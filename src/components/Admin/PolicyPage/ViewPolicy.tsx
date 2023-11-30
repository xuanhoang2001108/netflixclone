import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useGetPermissionQuery,
  useGetPermissionSetByIdQuery,
  useGetPermissionSetQuery,
} from "../../../store/service/getUser.service";
import { useNavigate, useParams } from "react-router-dom";

import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { toast } from "react-toastify";
import React from "react";
import { useDeletePermissionSetMutation } from "../../../store/service/register.service";
import { DataGrid } from "@mui/x-data-grid";
import {
  Dialog,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
function ViewPolicy() {
  const { permissionSetId } = useParams();
  const navigate = useNavigate();
  useGetPermissionQuery();
  const [deletePermissionSet, setDeletePermissionSet] = React.useState<
    string | null
  >(null);

  const [deletePermissionSetMutation] = useDeletePermissionSetMutation();
  const { refetch } = useGetPermissionSetQuery();
  const {
    data: permissionSetData,
    isLoading,
    refetch: refetchId,
    error,
  } = useGetPermissionSetByIdQuery(permissionSetId || "");
  React.useEffect(() => {
    refetchId();
  }, [permissionSetId]);

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!permissionSetData) {
    return <Box>User not found</Box>;
  }

  const handleDeleteConfirmation = (id: any) => {
    setDeletePermissionSet(id);
  };
  const { name, permissions } = permissionSetData;

  const rows = permissions.map((permission: any) => ({
    id: permission.id,
    name: permission.name || "",
    sort: permission.sort || 0,
  }));

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 200 },
  ];
  const handleCancelDelete = () => {
    setDeletePermissionSet(null);
  };
  const handleDelete = async (id: string) => {
    try {
      await deletePermissionSetMutation(id);
      refetch();
      toast.success("Permission deleted successfully");
      navigate("/AdminLoginPage/AdminPage/PolicyPage");
    } catch (error) {
      console.error(error);
      toast.error("Error deleting Policy");
    } finally {
      setDeletePermissionSet(null);
    }
  };
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <Typography variant="h4">{name}</Typography>
        <Button
          variant="contained"
          sx={{ ml: 40 }}
          onClick={() =>
            navigate(
              `/AdminLoginPage/AdminPage/PolicyPage/EditPolicy/${permissionSetId}`
            )
          }
        >
          <CreateIcon sx={{ mr: 1 }}></CreateIcon> EDIT
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={(event) => {
            handleDeleteConfirmation(permissionSetId);
            event.stopPropagation();
          }}
        >
          <DeleteIcon sx={{ mr: 1 }}></DeleteIcon> DELETE
        </Button>
      </Box>
      <Typography variant="h5">Overview</Typography>
      <Typography variant="h5">List of permissions:</Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 100]}
        sx={{
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
            {
              color: "black",
            },
          width: 600,
        }}
      />
      <Dialog
        open={Boolean(deletePermissionSet)}
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
            onClick={() =>
              deletePermissionSet && handleDelete(deletePermissionSet)
            }
            color="primary"
            autoFocus
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default ViewPolicy;
