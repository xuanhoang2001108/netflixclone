import { MainHeader } from "../components";
import VideoPortalContainer from "../components/VideoPortalContainer";
import { Box } from "@mui/material";
export default function MainLayout() {
  return (
    <Box sx={{ backgroundColor: "black" }}>
      <MainHeader></MainHeader>
      <VideoPortalContainer></VideoPortalContainer>
    </Box>
  );
}
