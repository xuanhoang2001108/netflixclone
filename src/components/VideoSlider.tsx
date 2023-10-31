import { useCallback, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import Stack from "@mui/material/Stack";
import NetflixIconButton from "./NetflixIconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import AddIcon from "@mui/icons-material/Add";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";

import {
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
} from "../store/service/image.service";
import { Movie } from "../types/Movie";
import { IMG_URL } from "./VideoPlayer";
import PlayButton from "./PlayButton";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import { MovieDetail } from "./MovieDetail";
import CloseIcon from "@mui/icons-material/Close";
import Player from "video.js/dist/types/player";
interface VideoSliderProps {
  movieGerne: string;
}

export function VideoSlider(props: VideoSliderProps) {
  let data;
  let isFetching;
  const playerRef = useRef<Player | null>(null);
  const { movieGerne } = props;
  const [showContainer, setShowContainer] = useState(false);
  const [showContainer2, setShowContainer2] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const [muted, setMuted] = useState(true);
  const navigate = useNavigate();
  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);
  if (movieGerne === "Popular Movies") {
    ({ data, isFetching } = useGetPopularQuery());
  }
  if (movieGerne === "Top Rated Movies") {
    ({ data, isFetching } = useGetTopRatedQuery());
  }
  if (movieGerne === "Now Playing Movies") {
    ({ data, isFetching } = useGetNowPlayingQuery());
  }
  if (!data) {
    return <div>No data</div>;
  }
  const handleMouseLeave = () => {
    setShowContainer2(false);
  };

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: "30px", sm: "60px" },
        pb: 4,
      }}
    >
      <Stack direction="row" spacing={1} onMouseLeave={handleMouseLeave}>
        <div
          className="font-bold text-white text-2xl mt-3 mb-3"
          onMouseEnter={() => {
            setShowContainer2(true);
          }}
        >
          {movieGerne}
        </div>
        {showContainer2 && (
          <Link
            to={`/${movieGerne}`}
            style={{ textDecoration: "inherit" }}
            className="font-bold text-lime-300 text-2xl mt-3 mb-3"
          >
            Explore All
          </Link>
        )}
        <div style={{ flexGrow: 0.845 }} />
        <div className="translate-x-4 -translate-y-14 "></div>
      </Stack>
      <Swiper slidesPerView={6} spaceBetween={8}>
        {!isFetching &&
          data.results.map((movieDetail: Movie) => (
            <SwiperSlide key={movieDetail.id}>
              <Grid item xs={6} sm={3} md={2}>
                <div
                  onMouseEnter={() => {
                    setHoveredMovie(movieDetail);
                    setShowContainer(true);
                  }}
                  onMouseLeave={() => {
                    setHoveredMovie(null);
                    setShowContainer(false);
                  }}
                >
                  <img
                    className="rounded-lg"
                    src={`${IMG_URL}${movieDetail.poster_path}`}
                  />

                  {showContainer && hoveredMovie === movieDetail && (
                    <div className="-translate-y-80 translate-x-0 w-80 z-50 absolute bg-black">
                      <img
                        className="rounded-lg "
                        src={`${IMG_URL}${movieDetail.backdrop_path}`}
                      />

                      <div className="translate-x-4 -translate-y-8">
                        <Stack direction="row" spacing={1}>
                          <NetflixIconButton sx={{ p: 0 }}>
                            <PlayCircleIcon
                              sx={{ width: 40, height: 40 }}
                              onClick={() => {
                                navigate("/WatchPage");
                              }}
                            />
                          </NetflixIconButton>
                          <NetflixIconButton>
                            <AddIcon />
                          </NetflixIconButton>
                          <NetflixIconButton>
                            <ThumbUpOffAltIcon />
                          </NetflixIconButton>
                          <div style={{ flexGrow: 0.75 }} />
                          <NetflixIconButton
                            onClick={() => {
                              setShowModal(true);
                            }}
                          >
                            <ExpandMoreIcon />
                          </NetflixIconButton>
                        </Stack>
                      </div>
                    </div>
                  )}
                </div>
              </Grid>
            </SwiperSlide>
          ))}
      </Swiper>
      {showModal && (
        <Stack
          style={{
            width: 800,
            left: "50%",
            transform: "translate(-50%, -50%)",
            position: "absolute",
            zIndex: "1000",
          }}
        >
          <MovieDetail />
          <Stack
            className="absolute"
            sx={{
              top: 0,
              right: 0,
              padding: "12px",
            }}
          >
            <NetflixIconButton
              onClick={() => {
                setShowModal(false);
              }}
            >
              <CloseIcon />
            </NetflixIconButton>
          </Stack>
          <Stack
            spacing={4}
            sx={{
              bottom: "35%",
              position: "absolute",
              left: { xs: "4%", md: "60px" },
              zIndex: 10,
            }}
          >
            <Stack
              direction={{ xs: "column", sm: "row" }}
              spacing={2}
              sx={{
                width: 1000,
              }}
            >
              <PlayButton size="large" />
              <NetflixIconButton size="large">
                <AddIcon />
              </NetflixIconButton>
              <NetflixIconButton size="large">
                <ThumbUpOffAltIcon />
              </NetflixIconButton>
              <div className="w-[350px]"></div>
              <NetflixIconButton
                size="large"
                onClick={() => handleMute(muted)}
                sx={{ zIndex: 1 }}
              >
                {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
              </NetflixIconButton>
            </Stack>
          </Stack>
        </Stack>
      )}
    </Container>
  );
}
