import Box from "@mui/material/Box";
import {
  useGetAllUserQuery,
  useGetPermissionSetQuery,
  useGetRoleNameQuery,
} from "../store/service/getUser.service";
import { useNavigate, useParams } from "react-router-dom";
import TextField from "@mui/material/TextField";
import { Button, Tab, Tabs, Typography } from "@mui/material";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { DataGrid } from "@mui/x-data-grid";

import React, { useState } from "react";
function ViewRole() {
  const { roleId } = useParams();
  const navigate = useNavigate();
  const [value, setValueTab] = React.useState(0);
  const [searchText, setSearchText] = useState("");
  const [selectedRows, setSelectedRows] = useState([]);
  const handleChange = (_event: any, newValue: any) => {
    setValueTab(newValue);
  };
  const handleSearchChange = (event: any) => {
    setSearchText(event.target.value);
  };

  const handleSelectionModelChange = (selection: any) => {
    setSelectedRows(selection);
  };
  const { data: permissionSetData } = useGetPermissionSetQuery();
  const { data: usernameHasPermission } = useGetAllUserQuery();
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
  const rowTab0 = permissionSetIds.map((id) => {
    const matchedPermissionSet = permissionSetData?.data.find(
      (permissionSet: any) => permissionSet.id === id
    );

    return {
      id,
      name: matchedPermissionSet?.name || "",
      sort: matchedPermissionSet?.sort || 0,
    };
  });

  const rowTab1 = userIds.map((id) => {
    const matchedUsernameHasPermission = usernameHasPermission?.data.find(
      (UsernameHasPermission: any) => UsernameHasPermission.id === id
    );

    return {
      id,
      userName: matchedUsernameHasPermission?.userName || "",
    };
  });

  const filteredRowTab0 = rowTab0.filter((row) =>
    row.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const filteredRowTab1 = rowTab1.filter((row) =>
    row.userName.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%" }}>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <Typography variant="h3">{roleData.name}</Typography>
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
      <TextField
        label="Search"
        variant="outlined"
        sx={{ width: "100%" }}
        InputProps={{
          style: { color: "black" },
        }}
        value={searchText}
        onChange={handleSearchChange}
      />
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
                  rows={filteredRowTab0}
                  columns={[
                    {
                      field: "name",
                      headerName: "Name",
                      width: 200,
                    },
                    {
                      field: "sort",
                      headerName: "Sort",
                      width: 200,
                    },
                  ]}
                  pageSizeOptions={[5, 10, 100]}
                  onRowSelectionModelChange={handleSelectionModelChange}
                  rowSelectionModel={selectedRows}
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
                  rows={filteredRowTab1}
                  columns={[
                    {
                      field: "userName",
                      headerName: "Name",
                      width: 400,
                    },
                  ]}
                  pageSizeOptions={[5, 10, 100]}
                  onRowSelectionModelChange={handleSelectionModelChange}
                  rowSelectionModel={selectedRows}
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
