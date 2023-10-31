import "swiper/css";
import VideoJSPlayer from "./VideoJSPlayer";
import {
  useGetPopularQuery,
  useLazyGetAppendedVideosQuery,
} from "../store/service/image.service";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Movie } from "../types/Movie";
import Player from "video.js/dist/types/player";
import { getRandomNumber } from "../utils/common";
import MoreInfoButton from "./MoreInfoButton";
import PlayButton from "./PlayButton";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import MaxLineTypography from "./MaxLineTypography";
import NetflixIconButton from "./NetflixIconButton";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import MaturityRate from "./MaturityRate";

export function VideoPlayerContainer() {
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(true);
  const maturityRate = useMemo(() => {
    return getRandomNumber(20);
  }, []);
  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
  }, []);
  const { data } = useGetPopularQuery();
  useEffect(() => {
    if (data && data.results) {
      const videos = data.results.filter((item: Movie) => !!item.backdrop_path);

      setVideo(videos[getRandomNumber(videos.length)]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);
  useEffect(() => {
    if (video) {
      getVideoDetail({ id: video.id });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);
  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        position: "absolute",
        bgcolor: "black"
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{
          alignItems: "center",
          position: "absolute",
          right: 0,
          bottom: "35%",
        }}
      >
        <NetflixIconButton
          size="large"
          onClick={() => handleMute(muted)}
          sx={{ zIndex: 1 }}
        >
          {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
        </NetflixIconButton>
        <MaturityRate>{`${maturityRate}+`}</MaturityRate>
      </Stack>
      {video && (
        <>
          <Box
            sx={{
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              position: "absolute",
            }}
          >
            {detail && (
              <VideoJSPlayer
                options={{
                  loop: true,
                  muted: true,
                  autoplay: true,
                  controls: false,
                  responsive: true,
                  fluid: true,
                  techOrder: ["youtube"],
                  sources: [
                    {
                      type: "video/youtube",
                      src: `https://www.youtube.com/watch?v=${
                        detail.videos.results[0]?.key || "L3oOldViIgY"
                      }`,
                    },
                  ],
                }}
                onReady={handleReady}
              />
            )}
          </Box>

          <Box
            sx={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: "100%",
              height: "100%",
            }}
          >
            <Stack
              spacing={4}
              sx={{
                bottom: "35%",
                position: "absolute",
                left: { xs: "4%", md: "60px" },
                top: 0,
                width: "36%",
                zIndex: 10,
                justifyContent: "flex-end",
              }}
            >
              <MaxLineTypography variant="h2" maxLine={1} color="text.primary">
                {video.title}
              </MaxLineTypography>
              <MaxLineTypography variant="h5" maxLine={3} color="text.primary">
                {video.overview}
              </MaxLineTypography>
              <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                <PlayButton size="large" />
                <MoreInfoButton size="large" />
              </Stack>
            </Stack>
          </Box>
        </>
      )}
    </Box>
  );
}
