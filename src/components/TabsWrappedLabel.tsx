import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useAddAccountMutation } from "../store/service/register.service";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  useGetAllUserQuery,
  useGetRoleQuery,
} from "../store/service/getUser.service";

import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { DataGrid } from "@mui/x-data-grid";
import React from "react";

type UserSubmitRegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
  phoneNumber: string;
  roleIds: string[];
};
export default function TabsWrappedLabel() {
  const [value, setValueTab] = React.useState(0);
  const [roleIds, setRoleIds] = React.useState<string[]>([]);
  const [roleNames, setRoleNames] = React.useState<string[]>([]);
  const navigate = useNavigate();
  const [registerAccount] = useAddAccountMutation();
  const { refetch } = useGetAllUserQuery();
  const handleChange = (_event: any, newValue: any) => {
    setValueTab(newValue);
  };

  const { data: roleData } = useGetRoleQuery();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    confirmPassword: Yup.string()
      .required("ConfirmPassword is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
    phoneNumber: Yup.string().required("Phone Number is required"),
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
      await registerAccount(data);
      refetch();
      toast.success("User create successfully");
      navigate("/AdminPage/UserPage");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  return (
    <Box sx={{ width: "100%" }}>
      <form className="  mr-20" onSubmit={handleSubmit(onSubmitHandler)}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
          }}
        >
          <Typography variant="h5">CREATE NEW USER</Typography>
          <Button
            className="rounded-md  "
            type="submit"
            style={{ marginTop: 20, marginBottom: 4, marginLeft: 20 }}
            variant="contained"
          >
            CREATE
          </Button>
          <Button
            className="rounded-md  "
            style={{ marginTop: 20, marginLeft: 4, marginBottom: 4 }}
            variant="contained"
            onClick={() => navigate("/AdminPage/UserPage")}
          >
            CANCEL
          </Button>
        </Box>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value={0} label="User"></Tab>
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
            <TextField
              id="email"
              label="Email"
              type="text"
              {...register("email")}
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
              {...register("phoneNumber")}
              sx={{ input: { color: "black" } }}
            />
            {errors.phoneNumber && (
              <div className="text-sm text-orange-600">
                Your phone must be a valid phone number.
              </div>
            )}
            <TextField
              id="pass"
              label="Password"
              variant="filled"
              type="password"
              {...register("password")}
              sx={{ input: { color: "black" } }}
            />
            {errors.password && (
              <div className="text-sm text-orange-600 ">
                Your password must contain between 4 and 60 characters.
              </div>
            )}
            <TextField
              id="confirmPass"
              label="Confirm Password"
              variant="filled"
              type="password"
              {...register("confirmPassword")}
              sx={{ input: { color: "black" } }}
            />
            {errors.confirmPassword && (
              <div className="text-sm text-orange-600 ">
                Your confirm password must match password.
              </div>
            )}
            <h1>Selected Roles: {roleNames.join(", ")}</h1>
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
    </Box>
  );
}
