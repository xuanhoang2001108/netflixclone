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

type UserSubmitForm = {
  email: string;
  password: string;
};
const LoginContainer = () => {
  const navigate = useNavigate();
  const validationSchema = Yup.object().shape({
    email: Yup.string().required("Email is required").email("Email is invalid"),
    password: Yup.string()
      .required("Password is required")
      .min(6, "Password must be at least 6 characters")
      .max(40, "Password must not exceed 40 characters"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserSubmitForm>({
    resolver: yupResolver(validationSchema),
  });

  const onSubmitHandler = (data: UserSubmitForm) => {
    console.log({ data });
  };

  const handleToHome = () => {
    navigate("/");
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
            className="h-auto"
            src="src/assets/background-image.jpg"
            alt="Background"
            style={{
              objectFit: "cover",
              position: "absolute",
              backgroundSize: "cover",
            }}
          />

          <div className="absolute flex flex-row space-y-[100px] space-x-[520px]">
            <LoginLogo sx={{ ml: { sm: 4 }, mt: 3 }} />
            <form
              className="absolute bg-black bg-opacity-80 pl-16 pr-16 pt-16 h-auto"
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
                  <div className="text-sm text-orange-600 mb-10">
                    Your password must contain between 4 and 60 characters.
                  </div>
                )}
          
                <button
                  className="rounded-md bg-red-600 h-12 text-lg font-semibold w-full "
                  type="submit"
                  style={{ marginTop: 40 }}
                  onClick={handleToHome}
                >
                  Sign in
                </button>
                <Stack direction={"row"} sx={{ alignItems: "center" }}>
                  <Checkbox color="default" />
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
                <div className="text-sm pb-60 text-slate-500 w-[20rem]">
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
