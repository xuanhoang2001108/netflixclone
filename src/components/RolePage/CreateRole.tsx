import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetPermissionSetQuery,
  useGetRoleQuery,
} from "../../store/service/getUser.service";
import { useNavigate } from "react-router-dom";
import React from "react";
import CancelIcon from "@mui/icons-material/Cancel";
import { useAddRoleMutation } from "../../store/service/register.service";
import { ToastContainer, toast } from "react-toastify";
import * as Yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

interface SelectedPermissionSetProps {
  name: string;
  onRemove: () => void;
}
type AddRoleData = {
  name: string;
  permissionSetIds: string[];
  userIds: string[];
};
export default function CreateRole() {
  const { data: permissionData } = useGetPermissionSetQuery();
  const { refetch } = useGetRoleQuery();
  const [permissionSetName, setPermissionSetName] = React.useState<string[]>(
    []
  );
  const [addRoleMutation] = useAddRoleMutation();
  const navigate = useNavigate();
  const [permissionSetIds, setPermissionSetIds] = React.useState<string[]>([]);
  const validationSchema = Yup.object().shape({
    name: Yup.string().required("Role Name is required"),
  });

  const { register, handleSubmit } = useForm<AddRoleData>({
    resolver: yupResolver(validationSchema) as any,
  });

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
  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 200 },
  ];
  const onSubmitHandler = async (data: AddRoleData) => {
    data.permissionSetIds = permissionSetIds;
    try {
      await addRoleMutation(data);
      refetch();
      toast.success("Role create successfully");
      navigate("/AdminPage/RolePage");
    } catch (error) {
      toast.error("Role create failed");
    }
  };

  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Typography variant="h3" sx={{ mr: 10 }}>
        ADD ROLE
      </Typography>
      <form className="  mr-20" onSubmit={handleSubmit(onSubmitHandler)}>
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          <TextField
            label="Role Name"
            variant="outlined"
            {...register("name")}
            InputProps={{
              style: { color: "black" },
            }}
          />

          <Button
            sx={{ marginLeft: "56%", bgcolor: "black", color: "white" }}
            type="submit"
          >
            CREATE
          </Button>
          <Button
            sx={{ marginLeft: 1, bgcolor: "black", color: "white" }}
            onClick={() => {
              navigate("/AdminPage/RolePage");
            }}
          >
            CANCEL
          </Button>
        </Box>

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: 600 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItems: "center",
              }}
            >
              <Typography variant="h5" sx={{ mr: 10 }}>
                All PermissionSets
              </Typography>
              <TextField
                label="Search"
                variant="outlined"
                sx={{ width: "100%" }}
                InputProps={{
                  style: { color: "black" },
                }}
              />
            </Box>

            <DataGrid
              rows={rows}
              columns={columns}
              pageSizeOptions={[5, 10, 100]}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
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
                mb: 2,
                "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
                  {
                    color: "black",
                  },
              }}
            />
          </Box>
          <Box sx={{ ml: 10 }}>
            <Typography variant="h5">
              Selected Permissions ({permissionSetName.length})
            </Typography>
            <input
              type="hidden"
              {...register("permissionSetIds")}
              value={JSON.stringify(permissionSetIds)}
            />
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
          </Box>
        </Box>
        <ToastContainer />
      </form>
    </Box>
  );
}
