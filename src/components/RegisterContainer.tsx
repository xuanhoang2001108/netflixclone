import AppBar from "@mui/material/AppBar";
import { APP_BAR_HEIGHT } from "../constant";
import LoginLogo from "./LoginLogo";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import { useAddAccountMutation } from "../store/service/register.service";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type UserSubmitRegisterForm = {
  email: string;
  password: string;
  confirmPassword: string;
};

const RegisterContainer = () => {
  const [registerAccount] = useAddAccountMutation();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),

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
      const response = await registerAccount(data);

      if ("error" in response) {
        toast.error("Registration failed. Please try again.");
      } else if ("data" in response) {
        toast.success("Registration successful!");
      }
    } catch (error) {
      console.error("Registration failed:", error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="justify-center">
      <AppBar
        sx={{
          height: APP_BAR_HEIGHT,
          boxShadow: 0,
          bgcolor: "transparent",
        }}
      >
        <div
          style={{
            position: "relative",
          }}
        >
          <img
            className="h-screen w-screen"
            src="/assets/background-image.jpg"
            alt="Background"
            style={{
              objectFit: "fill",
              position: "absolute",
              backgroundSize: "cover",
            }}
          />
          <div className=" absolute">
            <LoginLogo sx={{ ml: { sm: 4 }, mt: 3 }} />
          </div>
          <div className="absolute flex flex-row left-0 right-0 place-content-center top-20">
            <form
              className="absolute bg-black bg-opacity-80"
              onSubmit={handleSubmit(onSubmitHandler)}
              style={{
                padding: "2rem",
                borderRadius: "8px",
              }}
            >
              <div className="text-4xl font-semibold"> Sign Up</div>
              <Stack
                direction={"column"}
                sx={{ marginTop: "18px" }}
                spacing={1}
              >
                <TextField
                  label="Email"
                  type="text"
                  {...register("email")}
                  variant="filled"
                  style={{
                    width: "100%",
                    backgroundColor: "rgba(61, 66, 61, 1)",
                    marginTop: 20,
                  }}
                />
                {errors.email && (
                  <div className="text-sm text-orange-600">
                    Please enter a valid email.
                  </div>
                )}

                <TextField
                  label="Password"
                  variant="filled"
                  type="password"
                  {...register("password")}
                  id="pass"
                  style={{
                    width: 350,
                    backgroundColor: "rgba(61, 66, 61, 1)",
                    marginTop: 20,
                  }}
                />
                {errors.password && (
                  <div className="text-sm text-orange-600 mb-10">
                    Your password must contain between 4 and 60 characters.
                  </div>
                )}

                <TextField
                  label="Confirm Password"
                  variant="filled"
                  type="password"
                  {...register("confirmPassword")}
                  id="pass"
                  style={{
                    width: 350,
                    backgroundColor: "rgba(61, 66, 61, 1)",
                    marginTop: 20,
                  }}
                />
                {errors.confirmPassword && (
                  <div className="text-sm text-orange-600 ">
                    Your confirm password must match password
                  </div>
                )}
                <button
                  className="rounded-md bg-red-600 h-12 text-lg font-semibold w-full "
                  type="submit"
                  style={{ marginTop: 20 }}
                  // onClick={handleToHome}
                >
                  Sign up
                </button>

                <Stack direction={"row"}>
                  <div className="text-md text-slate-500 ">
                    A member of Netflix?
                  </div>
                  <div className="text-md ml-2 ">
                    <Link to={"/LoginPage"}>Sign in now.</Link>
                  </div>
                </Stack>
              </Stack>
            </form>
          </div>
        </div>
      </AppBar>
      <ToastContainer />
    </div>
  );
};

export default RegisterContainer;
