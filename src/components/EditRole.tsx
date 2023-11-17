import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import {
  useGetPermissionSetQuery,
  useGetRoleNameQuery,
} from "../store/service/getUser.service";
import CancelIcon from "@mui/icons-material/Cancel";
import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import { useParams } from "react-router-dom";
interface SelectedPermissionSetProps {
  name: string;
  onRemove: () => void;
}
function EditRole() {
  const { roleId } = useParams();
  const { data: permissionData } = useGetPermissionSetQuery();
  const {
    data: roleData,
  
  } = useGetRoleNameQuery(roleId || "");

  const [permissionSetName, setPermissionSetName] = React.useState<string[]>(
    []
  );
  const [permissionSetIds, setPermissionSetIds] = React.useState<string[]>([]);
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
  console.log(roleData);
  const [selectionModel, setSelectionModel] = React.useState<string[]>([]);

  React.useEffect(() => {
    // Set the selection model based on permissionSetIds from roleData
    setSelectionModel(permissionSetIds);
  }, [permissionSetIds]);
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Typography variant="h5">EDIT ROLE</Typography>
      <hr />
      <Box>
        <TextField
          id="outlined-read-only-input"
          label="Role Name"
          defaultValue={roleData?.name}
          sx={{ input: { color: "black" }, mb: 2 }}
        ></TextField>
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
      </Box>
    </Box>
  );
}

export default EditRole;
