import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import {
  useGetPermissionByIdQuery,
  useGetPermissionQuery,
  useGetPermissionSetQuery,
} from "../../store/service/getUser.service";
import { useNavigate, useParams } from "react-router-dom";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
} from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useDeletePermissionMutation } from "../../store/service/register.service";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { DataGrid } from "@mui/x-data-grid";

function ViewPermission() {
  const { permissionId } = useParams();
  const { data: permissionSetData } = useGetPermissionSetQuery();
  const navigate = useNavigate();
  const [deletePermission, setDeletePermission] = React.useState<string | null>(
    null
  );
  const { refetch } = useGetPermissionQuery();
  const [deletePermissionMutation] = useDeletePermissionMutation();
  const {
    data: permissionData,
    isLoading,
    refetch: refetchId,
    error,
    isSuccess,
  } = useGetPermissionByIdQuery(permissionId || "");
  React.useEffect(() => {
    if (isSuccess) {
      refetchId();
    }
  }, [isSuccess]);
  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!permissionData) {
    return <Box>User not found</Box>;
  }

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
  console.log(permissionData);
  const { permissionSetIdList } = permissionData;

  const rowTab0 = permissionSetIdList.map((id: any) => {
    const matchedPermissionSet = permissionSetData?.data.find(
      (permissionSet: any) => permissionSet.id === id
    );

    return {
      id,
      name: matchedPermissionSet?.name || "",
      description: matchedPermissionSet?.description,
    };
  });

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h3">{permissionData.name}</Typography>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="contained"
            sx={{ ml: 67 }}
            onClick={() =>
              navigate(
                `/AdminPage/PermissionPage/EditPermission/${permissionId}`
              )
            }
          >
            <CreateIcon sx={{ mr: 1 }}></CreateIcon> EDIT
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            onClick={(event) => {
              handleDeleteConfirmation(permissionId);
              event.stopPropagation();
            }}
          >
            <DeleteIcon sx={{ mr: 1 }}></DeleteIcon> DELETE
          </Button>
        </Box>
      </Box>
      <Typography variant="h6">Sort: {permissionData.sort}</Typography>
      <Accordion sx={{ backgroundColor: "white", color: "black", mr: 2 }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Policies contain this permission:</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <DataGrid
            rows={rowTab0}
            columns={[
              {
                field: "name",
                headerName: "Name",
                width: 400,
              },
              {
                field: "description",
                headerName: "Description",
                flex: 1,
                renderCell: (params) => (
                  <div
                    style={{
                      maxHeight: "3em",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "pre-line",
                    }}
                  >
                    {params.value}
                  </div>
                ),
              },
            ]}
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
            }}
          />
        </AccordionDetails>
      </Accordion>
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
    </Box>
  );
}

export default ViewPermission;
