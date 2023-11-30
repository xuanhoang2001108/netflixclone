import Box from "@mui/material/Box";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetAllUserQuery,
  useGetRoleQuery,
  useGetUserByIdQuery,
} from "../../../store/service/getUser.service";
import { Stack, TextField, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import SaveIcon from "@mui/icons-material/Save";
import { useEditUserMutation } from "../../../store/service/register.service";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import React from "react";
import * as Yup from "yup";
import { DataGrid } from "@mui/x-data-grid";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
type UserSubmitRegisterForm = {
  email: string;
  phoneNumber: string;
  roleIds: string[];
  id: any;
};
function EditUser() {
  const { userId } = useParams();

  const [editUser] = useEditUserMutation();
  const {
    data: userData,
    error,
    isSuccess,

    refetch: refetchId,
    isLoading,
  } = useGetUserByIdQuery(userId || "");
  const [phoneNumber] = useState(userData?.phoneNumber || "");
  const [value, setValueTab] = React.useState(0);
  const [roleIds, setRoleIds] = React.useState<string[]>([]);
  const [, setRoleNames] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const { refetch } = useGetAllUserQuery();
  const handleChange = (_event: any, newValue: any) => {
    setValueTab(newValue);
  };
  const [selectedRoles, setSelectedRoles] = React.useState<string[]>([]);
  const [selectedRoleIds, setSelectedRoleIds] = React.useState<string[]>([]);
  useEffect(() => {
    if (userData) {
      const userRoleIds = userData.roles.map((role: any) => role.id);
      const userRoles = userData.roles.map((role: any) => role.name);

      setSelectedRoleIds(userRoleIds);
      setSelectedRoles(userRoles);
    }
  }, [userData]);
  const { data: roleData } = useGetRoleQuery();
  const validationSchema = Yup.object().shape({
    email: Yup.string().notRequired(),
    phoneNumber: Yup.string().notRequired(),
    roleIds: Yup.string().notRequired(),
  });
  const rows = roleData
    ? roleData.data.map((role: any) => ({ id: role.id, Name: role.name }))
    : [];

  const columns = [{ field: "Name", headerName: "Name", width: 200 }];
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm<UserSubmitRegisterForm>({
    resolver: yupResolver(validationSchema) as any,
  });

  const onSubmitHandler = async (data: UserSubmitRegisterForm) => {
    data.roleIds = roleIds;
    try {
      await editUser({
        id: userId, // Pass the id from the URL parameters
        roleIds: data.roleIds,
        phoneNumber: data.phoneNumber,
        email: data.email,
      });
      refetch();
      toast.success("User create successfully");
      navigate("/AdminLoginPage/AdminPage/UserPage");
    } catch (error) {
      toast.error("Registration failed");
    }
  };
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

  if (!userData) {
    return <Box>User not found</Box>;
  }

  const { userName } = userData;
  console.log(userData);
  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <Box sx={{ width: "100%" }}>
        <form className="  mr-20" onSubmit={handleSubmit(onSubmitHandler)}>
          <Box sx={{ display: "flex", flexDirection: "row", mb: 5 }}>
            <Typography variant="h5" sx={{ mb: 2, ml: 2 }}>
              Edit new user
            </Typography>
            <Button variant="contained" sx={{ ml: 30 }} type="submit">
              <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE
            </Button>
            <Button variant="contained" sx={{ ml: 2 }} type="submit">
              <SaveIcon sx={{ mr: 2 }}></SaveIcon> SAVE & CLOSE
            </Button>
            <Button
              variant="contained"
              sx={{ ml: 2 }}
              onClick={() => navigate("/AdminLoginPage/AdminPage/UserPage")}
            >
              CANCEL
            </Button>
          </Box>
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="wrapped label tabs example"
          >
            <Tab value={0} label="User" />
            <Tab value={1} label="Role" />
          </Tabs>
          {value === 0 && (
            <Stack
              direction={"column"}
              spacing={1}
              style={{
                border: "1px solid #000000",
                borderRadius: "8px",
                padding: "10px",
              }}
            >
              <input
                type="hidden"
                {...register("email")}
                value={userData.email}
              />

              <TextField
                id="email"
                label="Email"
                type="text"
                defaultValue={userName}
                InputProps={{ readOnly: true }}
                variant="filled"
                sx={{ input: { color: "black" } }}
              />

              {errors.email && (
                <div className="text-sm text-orange-600 ">
                  Please enter a valid email.
                </div>
              )}
              <TextField
                id="phoneNumber"
                label="Phone Number"
                variant="filled"
                defaultValue={phoneNumber}
                {...register("phoneNumber")}
                sx={{ input: { color: "black" } }}
              />
              {errors.phoneNumber && (
                <div className="text-sm text-orange-600">
                  Your phone must be a valid phone number.
                </div>
              )}

              <h1>Selected Roles: {selectedRoles.join(", ")}</h1>
              <input
                type="hidden"
                {...register("roleIds")}
                value={JSON.stringify(roleIds)}
              />
            </Stack>
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
                      rows={rows}
                      columns={columns}
                      pageSizeOptions={[5, 10, 100]}
                      initialState={{
                        pagination: {
                          paginationModel: { page: 0, pageSize: 5 },
                        },
                      }}
                      rowSelectionModel={selectedRoleIds}
                      onRowSelectionModelChange={(selection) => {
                        const selectedRoles = selection
                          .map((selectedIndex) =>
                            rows.find((row: any) => row.id === selectedIndex)
                          )
                          .filter(Boolean)
                          .map((row) => row.Name);
                        const selectedRoleIds = selection
                          .map((selectedIndex) =>
                            rows.find((row: any) => row.id === selectedIndex)
                          )
                          .filter(Boolean)
                          .map((row) => row.id);
                        setRoleIds(selectedRoleIds);
                        setRoleNames(selectedRoles);
                        setSelectedRoleIds(selectedRoleIds);
                        setSelectedRoles(selectedRoles);
                      }}
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
        </form>
      </Box>{" "}
    </Box>
  );
}

export default EditUser;
