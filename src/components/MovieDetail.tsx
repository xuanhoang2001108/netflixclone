import "swiper/css";
import VideoJSPlayer from "./VideoJSPlayer";
import {
  useGetPopularQuery,
  useLazyGetAppendedVideosQuery,
} from "../store/service/video.service";
import { useCallback, useEffect, useRef, useState } from "react";
import { Movie } from "../types/Movie";
import Player from "video.js/dist/types/player";

export const IMG_URL = "https://image.tmdb.org/t/p/w500/";

interface MovieDetailProps {
  movieId: number;
}

export function MovieDetail({ movieId }: MovieDetailProps) {
  const [getVideoDetail, { data: detail }] = useLazyGetAppendedVideosQuery();
  const [video, setVideo] = useState<Movie | null>(null);
  const playerRef = useRef<Player | null>(null);
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

  useEffect(() => {
    if (video) {
      getVideoDetail({ id: movieId });
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
            </div>
          )}
        </>
      )}
    </>
  );
}
