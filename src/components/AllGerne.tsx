import { useCallback, useRef, useState } from "react";
import {
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
} from "../store/service/image.service";
import { Movie } from "../types/Movie";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";

import { useNavigate, useParams } from "react-router-dom";
import NetflixIconButton from "./NetflixIconButton";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import AddIcon from "@mui/icons-material/Add";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ThumbUpOffAltIcon from "@mui/icons-material/ThumbUpOffAlt";
import Stack from "@mui/material/Stack";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import VolumeOffIcon from "@mui/icons-material/VolumeOff";
import CloseIcon from "@mui/icons-material/Close";
import Player from "video.js/dist/types/player";
import PlayButton from "./PlayButton";
import { IMG_URL, MovieDetail } from "./MovieDetail";

export default function AllGerne() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const [showContainer, setShowContainer] = useState(false);
  const [hoveredMovie, setHoveredMovie] = useState<Movie | null>(null);
  const playerRef = useRef<Player | null>(null);
  const [muted, setMuted] = useState(false);
  const { movieGerne } = useParams();

  const handleMute = useCallback((status: boolean) => {
    if (playerRef.current) {
      playerRef.current.muted(!status);
      setMuted(!status);
    }
  }, []);

  const queries = {
    "Popular Movies": useGetPopularQuery(),
    "Top Rated Movies": useGetTopRatedQuery(),
    "Now Playing Movies": useGetNowPlayingQuery(),
  };

  const queryResult = queries[movieGerne as keyof typeof queries];
  const { data, isFetching } = queryResult || {};

  if (!data) {
    return <div>No data</div>;
  }

  return (
    <Container
      maxWidth={false}
      sx={{
        px: { xs: "30px", sm: "60px" },
        pb: 4,
        pt: "150px",
      }}
    >
      <h2 className="font-bold text-white text-2xl mt-3 mb-3">{movieGerne}</h2>
      <Grid container spacing={2}>
        {!isFetching &&
          data.results.map((movieDetail: Movie) => (
            <Grid item xs={6} sm={3} md={2} key={movieDetail.id}>
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
                  src={`${IMG_URL}${movieDetail.backdrop_path}`}
                />
                {showContainer && hoveredMovie === movieDetail && (
                  <div
                    className="-translate-y-40 -translate-x-20 w-80"
                    style={{
                      position: "absolute",
                      marginLeft: "80px",
                      backgroundColor: "black",
                    }}
                  >
                    <img
                      className="rounded-lg "
                      src={`${IMG_URL}${movieDetail.backdrop_path}`}
                    />
                    <Stack direction="row">
                      <h1
                        className="text-white font-bold translate-x-4 -translate-y-11  truncate"
                        style={{ maxWidth: "100px" }}
                      >
                        {movieDetail.title}
                      </h1>

                      <div style={{ flexGrow: 0.845 }} />
                      <div className="translate-x-4 -translate-y-14 ">
                        <NetflixIconButton sx={{ width: 42, height: 42 }}>
                          {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                        </NetflixIconButton>
                      </div>
                    </Stack>
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
          ))}
        {showModal && (
          <Stack
            className="absolute bg-white"
            style={{
              width: 800,
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
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
                width: "36%",
                zIndex: 10,
                top: 350,
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
                >
                  {!muted ? <VolumeUpIcon /> : <VolumeOffIcon />}
                </NetflixIconButton>
              </Stack>
            </Stack>
          </Stack>
        )}
      </Grid>
    </Container>
  );
}
