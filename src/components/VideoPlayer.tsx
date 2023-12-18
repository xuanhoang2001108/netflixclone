import "swiper/css";
import VideoJSPlayer from "./VideoJSPlayer";
import {
  useGetPopularQuery,
  useLazyGetAppendedVideosQuery,
} from "../store/service/video.service";
import { useCallback, useEffect, useRef, useState } from "react";
import { Movie } from "../types/Movie";
import Player from "video.js/dist/types/player";
import { useParams } from "react-router-dom";
import { MainHeader } from ".";


export const IMG_URL = "https://image.tmdb.org/t/p/w500/";

export function VideoPlayer() {
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const playerRef = useRef<Player | null>(null);
  const { movieId } = useParams();

  const handleReady = useCallback((player: Player) => {
    playerRef.current = player;
  }, []);
  const { data } = useGetPopularQuery();
  useEffect(
    () => {
      if (data) {
        const videos = data.results;

        setVideo(videos);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data]
  );
  const [videoDimensions, setVideoDimensions] = useState({
    width: window.innerWidth, // set initial width to window width
    height: window.innerHeight, // set initial height to window height
  });
  useEffect(() => {
    const handleResize = () => {
      setVideoDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  useEffect(() => {
    if (video) {
      getVideoDetail({ id: movieId });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video]);
  return (
    <>
      <MainHeader></MainHeader>
      {video && (
        <div style={{ overflow: "hidden"}}>
          {detail && (
            <VideoJSPlayer
              options={{
                loop: true,
                muted: true,
                autoplay: true,
                controls: true,
                width: videoDimensions.width,
                height: videoDimensions.height,

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
        
        </div>
      )}
    </>
  );
}
