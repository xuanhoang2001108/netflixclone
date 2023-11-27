import { useEffect } from "react";
import { MainHeader } from "../components";
import VideoPortalContainer from "../components/VideoPortalContainer";
import { Box } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useGetCurrentUserQuery } from "../store/service/getUser.service";

export default function MainLayout() {
  const navigate = useNavigate();
  const { data: currentUserData } = useGetCurrentUserQuery();

  useEffect(() => {
    const storedAccessToken = localStorage.getItem("accessToken");

    if (!storedAccessToken) {
      navigate("/LoginPage");
    }
    const isAdmin = currentUserData?.roles?.some(
      (role: any) => role.name === "Admin"
    );
    if (isAdmin) {
      navigate("/AdminPage");
    }
  }, [navigate, currentUserData]);

  console.log("currentData", currentUserData?.roles);

  return (
    <Box sx={{ backgroundColor: "black" }}>
      <MainHeader></MainHeader>
      <VideoPortalContainer></VideoPortalContainer>
    </Box>
  );
}
