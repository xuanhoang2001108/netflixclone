import AppBar from "@mui/material/AppBar";
import { APP_BAR_HEIGHT } from "../constant";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { StartHeader } from "./StartHeader";
import { useNavigate } from "react-router-dom";

const StartContainer = () => {
  const navigate = useNavigate();
  const handleNavigateToLogin = () => {
    navigate("/LoginPage");
  };
  return (
    <div className="justify-center">
      <AppBar
        sx={{
          height: APP_BAR_HEIGHT,
          backgroundImage: "none",
          boxShadow: 0,
        }}
      >
        <img
          className="w-screen h-screen"
          src="src/assets/background-image.jpg"
          alt="Background"
          style={{
            objectFit: "cover",
            position: "absolute",
          }}
        />
        <StartHeader />
        <div className="absolute  w-screen h-screen text-center mt-72">
          <h1 className="font-bold text-5xl">
            Unlimited movies, TV shows, and more
          </h1>
          <h1 className=" text-2xl mt-6">Watch anywhere. Cancel anytime</h1>
          <h1 className=" text-2xl mt-6">
            Ready to watch? Enter your email to create or restart your
            membership.
          </h1>
          <div className="flex justify-center">
            <Stack direction={"row"} sx={{ marginTop: "18px" }} spacing={1}>
              <TextField
                label="Email Address"
                variant="outlined"
                style={{
                  width: 400,
                  backgroundColor: "rgba(61, 66, 61, 0.3)",
                }}
              />

              <button
                className="rounded-md bg-red-600 w-44 h-18 text-2xl font-bold"
                onClick={handleNavigateToLogin}
              >
                Get Started
              </button>
            </Stack>
          </div>
        </div>
      </AppBar>
    </div>
  );
};

export default StartContainer;
