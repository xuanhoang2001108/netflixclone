import { Box } from "@mui/material";
import { MainHeader } from "../components";
import { AllGerne } from "../components/AllGerne";

export default function ExploreAllPage() {
  return (
    <Box sx={{ bgcolor: "black" }}>
      <MainHeader />
      <AllGerne />
    </Box>
  );
}
