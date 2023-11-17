import Box from "@mui/material/Box";
import {
  useGetPermissionSetByIdQuery,
  useGetRoleNameQuery,
} from "../store/service/getUser.service";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

import React from "react";
function ViewRole() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [value, setValueTab] = React.useState(0);

  const handleChange = (_event: any, newValue: any) => {
    setValueTab(newValue);
  };

  const {
    data: roleData,
    error,
    isLoading,
  } = useGetRoleNameQuery(roleId || "");

  if (isLoading) {
    return <Box>Loading...</Box>;
  }

  if (error) {
    return <Box>Error loading user data</Box>;
  }

  if (!roleData) {
    return <Box>User not found</Box>;
  }
  const { name, permissionSetIds, userIds } = roleData;

  console.log(roleData)
  const rowTab0 = [{}];

  const rowTab1 = [{}];
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h3">{name}</Typography>
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Button
            variant="contained"
            sx={{ ml: 40 }}
            onClick={() => navigate(`/AdminPage/RolePage/EditRole/${roleId}`)}
          >
            <CreateIcon sx={{ mr: 1 }}></CreateIcon> EDIT
          </Button>
          <Button
            variant="contained"
            sx={{ ml: 2 }}
            // onClick={(event) => {
            //   handleDeleteConfirmation(roleId);
            //   event.stopPropagation();
            // }}
          >
            <DeleteIcon sx={{ mr: 1 }}></DeleteIcon> DELETE
          </Button>
        </Box>
      </Box>
      <Typography variant="h5">Overview</Typography>
      <TextField
        id="outlined-read-only-input"
        defaultValue={name}
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
                  rows={rowTab0}
                  columns={[
                    {
                      field: "permissionSetId",
                      headerName: "Name",
                      width: 200,
                    },
                  ]}
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
                  rows={rowTab1}
                  columns={[
                    {
                      field: "userIds",
                      headerName: "USERS",
                      width: 200,
                    },
                  ]}
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
      )}
    </Box>
  );
}

export default ViewRole;
