import * as React from "react";
import Box from "@mui/material/Box";
import { VideoPlayerContainer } from "./VideoPlayerContainer";
import { VideoSlider } from "./VideoSlider";

class VideoPortalContainer extends React.Component {
  render() {
    return (
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          bgcolor: "black",
          height: "100%",
        }}
      >
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
          <VideoSlider moviegenre="Popular Movies" />
          <VideoSlider moviegenre="Top Rated Movies" />
          <VideoSlider moviegenre="Now Playing Movies" />
        </Box>
      </Box>
    );
  }
}

export default VideoPortalContainer;
