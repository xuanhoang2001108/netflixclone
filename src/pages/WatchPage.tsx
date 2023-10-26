import { Box } from "@mui/material";
import { MainHeader } from "../components";
import { VideoPlayer } from "../components/VideoPlayer";

export default function WatchPage() {
  return (
    <Box sx={{bgcolor: "black"}}>
      <MainHeader />
      <VideoPlayer />
    </Box>
  );
}
