import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetPermissionSetQuery,
  useGetRoleNameQuery,
  useGetRoleQuery,
} from "../store/service/getUser.service";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useEditRoleMutation } from "../store/service/register.service";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddRoleData } from "../types/Movie";
import { ToastContainer, toast } from "react-toastify";
interface SelectedPermissionSetProps {
  name: string;
  onRemove: () => void;
}
function EditRole() {
  const { roleId } = useParams();
  const { data: permissionData } = useGetPermissionSetQuery();
  const {
    data: roleData,
    refetch: refetchId,
    isSuccess,
  } = useGetRoleNameQuery(roleId || "");
  const [editRoleMutation] = useEditRoleMutation();
  const { data: role, error, isLoading } = useGetRoleNameQuery(roleId || "");
  const [permissionSetName, setPermissionSetName] = React.useState<string[]>(
    []
  );
  const { refetch } = useGetRoleQuery();
  const navigate = useNavigate();
  const [permissionSetIds, setPermissionSetIds] = React.useState<string[]>([]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Role Name is required"),
  });

  const { register, handleSubmit } = useForm<AddRoleData>({
    resolver: yupResolver(validationSchema) as any,
  });

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 200 },
  ];
  const rows = permissionData
    ? permissionData.data.map((permission: any) => ({
        id: permission.id,
        name: permission.name,
        sort: permission.sort,
      }))
    : [];
  const SelectedPermissionSet: React.FC<SelectedPermissionSetProps> = ({
    name,
    onRemove,
  }) => (
    <Box
      key={name}
      sx={{
        border: "solid 1px black",
        borderRadius: "40px",
        marginTop: "5px",
        padding: "2px",
        width: "fit-content",
        textAlign: "center",
        backgroundColor: "black",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div className="text-white">{name}</div>

      <CancelIcon onClick={onRemove} sx={{ color: "white", ml: 1 }} />
    </Box>
  );

  const [selectionModel, setSelectionModel] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectionModel(permissionSetIds);
  }, [permissionSetIds]);
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

  if (!roleData) {
    return <Box>User not found</Box>;
  }

  const onSubmitHandler = async (data: AddRoleData) => {
    data.permissionSetIds = permissionSetIds;
    try {
      if (roleId) {
        await editRoleMutation({
          id: roleId,
          name: data.name,
          permissionSetIds: data.permissionSetIds,
        });
        refetch();
        toast.success("Role update successful");
      } else {
        toast.error("Role update failed - roleId is undefined");
      }
    } catch (error) {
      toast.error("Role update failed");
    }
  };

  const onSubmitHandlerAndClose = async (data: AddRoleData) => {
    data.permissionSetIds = permissionSetIds;
    try {
      if (roleId) {
        await editRoleMutation({
          id: roleId,
          name: data.name,
          permissionSetIds: data.permissionSetIds,
        });
        refetch();
        toast.success("Role update successful");
        navigate("/AdminPage/RolePage");
      } else {
        toast.error("Role update failed - roleId is undefined");
      }
    } catch (error) {
      toast.error("Role update failed");
    }
  };

  const { name } = roleData;
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Typography variant="h5">EDIT ROLE</Typography>
      <hr />
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          id="outlined-read-only-input"
          label="Role Name"
          defaultValue={name}
          {...register("name")}
          sx={{ input: { color: "black" }, mb: 2 }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ ml: 30 }}
          onClick={handleSubmit(onSubmitHandler)}
        >
          <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={handleSubmit(onSubmitHandlerAndClose)}
        >
          <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE & CLOSE
        </Button>
        <Button
          variant="contained"
          sx={{ ml: 2 }}
          onClick={() => navigate("/AdminPage/RolePage")}
        >
          CANCEL
        </Button>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 100]}
        checkboxSelection
        onRowSelectionModelChange={(selection) => {
          const selectedPermissionSets = selection
            .map((selectedIndex) =>
              rows.find((row: any) => row.id === selectedIndex)
            )
            .filter(Boolean)
            .map((row) => row.name);
          const selectedPermissionSetIds = selection
            .map((selectedIndex) =>
              rows.find((row: any) => row.id === selectedIndex)
            )
            .filter(Boolean)
            .map((row) => row.id);
          setPermissionSetName(selectedPermissionSets);
          setPermissionSetIds(selectedPermissionSetIds);
        }}
        sx={{
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
            {
              color: "black",
            },
        }}
      />
      <Box sx={{ ml: 10 }}>
        <Typography variant="h5">
          Selected Permissions ({permissionSetName.length})
        </Typography>

        {permissionSetName.map((name) => (
          <SelectedPermissionSet
            key={name}
            name={name}
            onRemove={() => {
              // Implement the logic to remove the selected permission set here
              setPermissionSetName((prev) =>
                prev.filter((item) => item !== name)
              );
            }}
          />
        ))}
      </Box>{" "}
      <ToastContainer />
    </Box>
  );
}

export default EditRole;
