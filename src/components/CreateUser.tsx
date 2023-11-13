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
import { ToastContainer, toast } from "react-toastify";
import { useGetAllUserQuery } from "../store/service/getUser.service";

import React from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
type UserSubmitRegisterForm = {
  email: string;
  password: string;

  confirmPassword: string;
  phoneNumber: string;
};

export default function CreateUser() {
  const navigate = useNavigate();
  const [registerAccount] = useAddAccountMutation();
  const { refetch } = useGetAllUserQuery();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),

    phoneNumber: Yup.string().required("PhoneNumber is required"),
    confirmPassword: Yup.string()
      .required("ConfirmPassword is required")
      .oneOf([Yup.ref("password")], "Passwords must match"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitRegisterForm>({
    resolver: yupResolver(validationSchema),
  });
  const onSubmitHandler = async (data: UserSubmitRegisterForm) => {
    try {
      await registerAccount(data);
      refetch();
      toast.success("User create successfully");
      navigate("/AdminPage/UserPage");
    } catch (error) {
      toast.error("Registration failed");
    }
  };

  function TabsWrappedLabel() {
    const [value, setValue] = React.useState(0);

    const handleChange = (_event: any, newValue: any) => {
      setValue(newValue);
    };

    return (
      <Box sx={{ width: "100%" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="wrapped label tabs example"
        >
          <Tab value={0} label="User"></Tab>
          <Tab value={1} label="Role" />
        </Tabs>

        <TabPanel index={0} value={value}>
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
                label="Phone Number"
                variant="filled"
                type="phoneNumber"
                {...register("phoneNumber")}
                sx={{ input: { color: "black" } }}
                id="pass"
              />
              {errors.phoneNumber && (
                <div className="text-sm text-orange-600">
                  Your password must contain between 4 and 60 characters.
                </div>
              )}
              <TextField
                label="Password"
                variant="filled"
                type="password"
                {...register("password")}
                sx={{ input: { color: "black" } }}
                id="pass"
              />
              {errors.password && (
                <div className="text-sm text-orange-600 ">
                  Your password must contain between 4 and 60 characters.
                </div>
              )}
              <TextField
                label="Confirm Password"
                variant="filled"
                type="password"
                {...register("confirmPassword")}
                sx={{ input: { color: "black" } }}
                id="pass"
              />
              {errors.confirmPassword && (
                <div className="text-sm text-orange-600 ">
                  Your password must contain between 4 and 60 characters.
                </div>
              )}
            </Stack>
          </form>
        </TabPanel>

        <TabPanel index={1} value={value}>
          <Box>
            <Typography component="div">asdasd</Typography>
          </Box>
        </TabPanel>
      </Box>
    );
  }

  return (
    <Box sx={{ marginLeft: "20%", marginRight: "10%", marginTop: 10 }}>
      <TabsWrappedLabel />

      <ToastContainer />
    </Box>
  );
}
interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
