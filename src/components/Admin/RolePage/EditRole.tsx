import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetPermissionSetQuery,
  useGetRoleNameQuery,
  useGetRoleQuery,
} from "../../../store/service/getUser.service";
import CancelIcon from "@mui/icons-material/Cancel";
import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useEditRoleMutation } from "../../../store/service/register.service";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddRoleData } from "../../../types/Movie";
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
    error,
    isLoading,
  } = useGetRoleNameQuery(roleId || "");
  const [editRoleMutation] = useEditRoleMutation();
  const [permissionSetName, setPermissionSetName] = React.useState<string[]>(
    []
  );
  const { refetch } = useGetRoleQuery();
  const navigate = useNavigate();
  const [permissionSetIds, setPermissionSetIds] = React.useState<string[]>([]);
  const [initialSelectedRows, setInitialSelectedRows] = useState<string[]>([]);
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

      <CancelIcon
        onClick={() => {
          onRemove();
          const deselectedId = rows.find((row: any) => row.name === name)?.id;
          const newSelection = initialSelectedRows.filter(
            (id) => id !== deselectedId
          );
          setInitialSelectedRows(newSelection);
          setPermissionSetIds(newSelection);
        }}
        sx={{ color: "white", ml: 1 }}
      />
    </Box>
  );

  const [, setSelectionModel] = React.useState<string[]>([]);

  React.useEffect(() => {
    setSelectionModel(permissionSetIds);
  }, [permissionSetIds]);
  React.useEffect(() => {
    if (isSuccess) {
      refetchId();
    }
  }, [isSuccess]);
  useEffect(() => {
    if (roleData) {
      const selectedPermissionSetIds = roleData.permissionSets.map(
        (p: any) => p.id
      );
      setInitialSelectedRows(selectedPermissionSetIds);

      const selectedPermissionSets = roleData.permissionSets
        .map((selectedId) => rows.find((row: any) => row.id === selectedId))
        .filter(Boolean)
        .map((row: any) => row.name);

      setPermissionSetName(selectedPermissionSets);
      setPermissionSetIds(selectedPermissionSetIds);
    }
  }, [roleData]);

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
        navigate("/AdminLoginPage/AdminPage/RolePage");
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
          sx={{ input: { color: "black" }, mb: 2, mt: 2 }}
        ></TextField>
        <Button
          variant="contained"
          sx={{ ml: 51 }}
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
          onClick={() => navigate("/AdminLoginPage/AdminPage/RolePage")}
        >
          CANCEL
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row" }}>
        <DataGrid
          rows={rows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 5 },
            },
          }}
          rowSelectionModel={initialSelectedRows.map((id) => id.toString())}
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
              .map((row) => row.id.toString());
            setPermissionSetName(selectedPermissionSets);
            setPermissionSetIds(selectedPermissionSetIds);
            setInitialSelectedRows(selection as string[]);
          }}
          sx={{
            width: "",
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
          {permissionSetIds.map((id) => {
            const row = rows.find((row: any) => row.id === id);
            const name = row ? row.name : "";
            return (
              <SelectedPermissionSet
                key={id}
                name={name}
                onRemove={() => {
                  setPermissionSetIds((prevIds) =>
                    prevIds.filter((item) => item !== id)
                  );
                }}
              />
            );
          })}
        </Box>
      </Box>
      <ToastContainer />
    </Box>
  );
}

export default EditRole;
