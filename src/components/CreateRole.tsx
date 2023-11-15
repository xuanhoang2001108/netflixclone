import { Button, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPermissionSetQuery } from "../store/service/getUser.service";

export default function CreateRole() {
  const { data: permissionData } = useGetPermissionSetQuery();
  const rows = permissionData
    ? permissionData.data.map((permission: any) => ({
        id: permission.id,
        name: permission.name,
        sort: permission.sort, // Add sort property if available in your permission data
      }))
    : [];

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "sort", headerName: "Sort", width: 200 },
  ];
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          label="Role Name"
          variant="outlined"
          sx={{ width: "50%" }}
          InputProps={{
            style: { color: "black" },
          }}
        />
        <Button sx={{ marginLeft: 1, bgcolor: "black", color: "white" }}>
          CREATE
        </Button>
        <Button sx={{ marginLeft: 1, bgcolor: "black", color: "white" }}>
          CANCEL
        </Button>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h5">All PermissionSets</Typography>
        <TextField
          label="Search"
          variant="outlined"
          sx={{ width: "35%", ml: 20 }}
          InputProps={{
            style: { color: "black" },
          }}
        />
        <Box>
          <Typography variant="h5">Selected Permissions ({})</Typography>
        </Box>
      </Box>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 100]}
        checkboxSelection
        sx={{
          "& .MuiDataGrid-columnHeader, & .MuiDataGrid-cell, & .MuiTablePagination-root, & .MuiTablePagination-item":
            {
              color: "black",
            },
        }}
      />
    </Box>
  );
}
