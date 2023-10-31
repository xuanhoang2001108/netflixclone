import "swiper/css";
import VideoJSPlayer from "./VideoJSPlayer";
import {
  useGetPopularQuery,
  useLazyGetAppendedVideosQuery,
} from "../store/service/image.service";
import { useCallback, useEffect, useRef, useState } from "react";
import { Movie } from "../types/Movie";
import Player from "video.js/dist/types/player";
import { getRandomNumber } from "../utils/common";
import MaxLineTypography from "./MaxLineTypography";
import Box from "@mui/material/Box";

export const IMG_URL = "https://image.tmdb.org/t/p/w500/";

export function MovieDetail() {
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const playerRef = useRef<Player | null>(null);

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
  }, []);
  const { data } = useGetPopularQuery();
  useEffect(() => {
    if (data && data.results) {
      const videos = data.results.filter((item) => !!item.backdrop_path);
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

  return (
    <>
      {video && (
        <>
          {detail && (
            <div className="overflow-x-hidden bg-black">
              <VideoJSPlayer
                options={{
                  loop: true,
                  muted: true,
                  autoplay: true,
                  controls: false,
                  responsive: true,
                  fluid: true,
                  options: { navigationUI: "hide" },
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
              <Box
                sx={{
                  backgroundColor: "black",
                  marginLeft: "60px",
                  marginRight: "200px",
                }}
              >
                <MaxLineTypography maxLine={2} sx={{ color: "white" }}>
                  {video.overview}
                </MaxLineTypography>
                <div
                  className="text-2xl font-semibold "
                  style={{ color: "white" }}
                >
                  More Like This
                </div>
              </Box>
            </div>
          )}
        </>
      )}
    </>
  );
}
