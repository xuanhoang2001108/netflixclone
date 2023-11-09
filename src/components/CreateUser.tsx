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

  return (
    <Box
      sx={{
        marginLeft: "17%",
        marginRight: "10%",
        marginTop: 10,
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Typography variant="h5">User Form</Typography>

      <form className="  mr-20" onSubmit={handleSubmit(onSubmitHandler)}>
        <Button
          className="rounded-md  "
          type="submit"
          style={{ marginTop: 20 }}
          variant="contained"
        >
          CREATE
        </Button>
        <Button
          className="rounded-md  "
          style={{ marginTop: 20, marginLeft: 2 }}
          variant="contained"
          onClick={() => navigate("/AdminPage/UserPage")}
        >
          CANCEL
        </Button>
        <Stack direction={"column"} spacing={1}>
          <TextField
            label="Email"
            type="text"
            {...register("email")}
            variant="filled"
            sx={{ input: { color: "black" } }}
          />
          {errors.email && (
            <div className="text-sm text-orange-600">
              Please enter a valid email or phone number.
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
      <ToastContainer />
    </Box>
  );
}
