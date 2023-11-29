import { useEffect } from "react";
import { MainHeader } from "../components";
import VideoPortalContainer from "../components/VideoPortalContainer";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function MainLayout() {
  const navigate = useNavigate();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      navigate("/LoginPage");
    } else {
      navigate("/HomePage");
    }
  }, [navigate]);

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <MainHeader></MainHeader>
      <VideoPortalContainer></VideoPortalContainer>
    </Box>
  );
}
