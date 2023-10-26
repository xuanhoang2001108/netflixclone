import * as React from "react";
import Box from "@mui/material/Box";
import { VideoPlayerContainer } from "./VideoPlayerContainer";
import { VideoSlider } from "./VideoSlider";

class VideoPortalContainer extends React.Component {
  render() {
    return (
      <Box sx={{ position: "relative", zIndex: 1 }}>
        <Box
          sx={{
            mb: 3,
            pb: "40%",
            top: 0,
            left: 0,
            right: 0,
            position: "relative",
          }}
        >
          <VideoPlayerContainer />
        </Box>
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "100%",
            bgcolor: "black",
          }}
        >
          <VideoSlider movieGerne="Popular Movies" />
          <VideoSlider movieGerne="Top Rated Movies" />
          <VideoSlider movieGerne="Now Playing Movies" />
        </Box>
      </Box>
    );
  }
}

export default VideoPortalContainer;
