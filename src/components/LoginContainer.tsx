import AppBar from "@mui/material/AppBar";
import { APP_BAR_HEIGHT } from "../constant";
import LoginLogo from "./LoginLogo";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { useLogInMutation } from "../store/service/login.service";
import { useEffect } from "react";
import { useGetCurrentUserQuery } from "../store/service/getUser.service";

type UserSubmitForm = {
  email: string;
  password: string;
  rememberMe: boolean;
};

const LoginContainer = () => {
  const navigate = useNavigate();

  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
    rememberMe: Yup.boolean().required(),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });
  const [logIn, { data, isError, isSuccess, error }] = useLogInMutation();
  const accessToken = localStorage.getItem("accessToken") ?? "";

  const { data: currentUserData } = useGetCurrentUserQuery({ accessToken });
  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");
    if (savedEmail) {
      setValue("email", savedEmail);
    }
    if (savedPassword) {
      setValue("password", savedPassword);
    }
  }, [setValue]);

  const onSubmitHandler = async (data: UserSubmitForm) => {
    if (data.rememberMe) {
      localStorage.setItem("rememberMe", "true");
      localStorage.setItem("email", data.email);
      localStorage.setItem("password", data.password);
    } else {
      localStorage.removeItem("rememberMe");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
    }
    await logIn(data);
  };

  useEffect(() => {
    if (isSuccess) {
      if (data?.accessToken) {
        localStorage.setItem("accessToken", data.accessToken);
      }
    } else if (isError) {
      console.log(error);
    }
  }, [isSuccess, isError, onSubmitHandler]);

  useEffect(() => {
    if (currentUserData) {
      if (currentUserData?.roles?.some((role: any) => role.name === "User")) {
        navigate("/AdminLoginPage");
      } else {
        navigate("/HomePage");
      }
    }
  }, [navigate, currentUserData]);

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
          <div className="absolute">
            <LoginLogo sx={{ ml: { sm: 4 }, mt: 3 }} />
          </div>
          <div className="absolute flex flex-row left-0 right-0 place-content-center top-20">
            <form
              className="absolute bg-black bg-opacity-80 "
              onSubmit={handleSubmit(onSubmitHandler)}
              style={{
                padding: "2rem",
                borderRadius: "8px",
              }}
            >
              <div className="text-4xl font-semibold"> Sign In</div>
              <Stack
                direction={"column"}
                sx={{ marginTop: "18px" }}
                spacing={1}
              >
                <TextField
                  label="Email or phone number"
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
                    Please enter a valid email or phone number.
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
                  <div className="text-sm text-orange-600 ">
                    Your password must contain between 4 and 60 characters.
                  </div>
                )}
                {isError && (
                  <div className="text-sm text-orange-600">
                    {error instanceof Error
                      ? error.message
                      : "Invalid email or password."}
                  </div>
                )}

                <button
                  className="rounded-md bg-red-600 h-12 text-lg font-semibold w-full "
                  type="submit"
                  style={{ marginTop: 40 }}
                >
                  Sign in
                </button>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <Checkbox {...register("rememberMe")} color="default" />
                  <div className="text-sm text-slate-500">Remember me</div>

                  <div className="text-sm ml-36 text-slate-500">Need help?</div>
                </Stack>
                <Stack direction={"row"}>
                  <div className="text-md text-slate-500 mt-10">
                    New to Netflix?
                  </div>
                  <div className="text-md ml-2  mt-10">
                    <Link to={"/RegisterPage"}>Sign up now.</Link>
                  </div>
                </Stack>
                <div className="text-sm text-slate-500 w-[20rem]">
                  This page is protected by Google reCAPTCHA to ensure you're
                  not a bot. Learn more.
                </div>
              </Stack>
            </form>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default LoginContainer;
