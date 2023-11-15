import { Box, Typography } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useGetPermissionQuery } from "../store/service/getUser.service";

function PermissionSetPage() {
  const { data: permissionData } = useGetPermissionQuery();
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
    <Box
      sx={{
        marginLeft: "20%",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography component="div">
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
          </Typography>
        </Box>
      </Typography>
    </Box>
  );
}

export default PermissionSetPage;
