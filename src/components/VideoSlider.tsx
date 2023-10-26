import {
  useGetNowPlayingQuery,
  useGetPopularQuery,
  useGetTopRatedQuery,
} from "../store/service/image.service";
import { Movie } from "../types/Movie";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Stack from "@mui/material/Stack";

export const IMG_URL = "https://image.tmdb.org/t/p/w500/";

interface VideoSliderProps {
  movieGerne: string;
}

export function VideoSlider(props: VideoSliderProps) {
  let data;
  let isFetching;
  const { movieGerne } = props;
  const [showContainer, setShowContainer] = useState(false);
  const navigate = useNavigate();

  if (movieGerne === "Popular Movies")
    ({ data, isFetching } = useGetPopularQuery());
  if (movieGerne === "Top Rated Movies")
    ({ data, isFetching } = useGetTopRatedQuery());
  if (movieGerne === "Now Playing Movies")
    ({ data, isFetching } = useGetNowPlayingQuery());
  if (!data) {
    return <div>No data</div>;
  }

  const toWatchPage = () => {
    navigate("/WatchPage");
  };

  return (
    <div className="ml-16">
      <Stack
        direction="row"
        spacing={1}
        onMouseLeave={() => {
          setShowContainer(false);
        }}
      >
        <div
          className="font-bold text-white text-2xl mt-3 mb-3"
          onMouseOver={() => {
            setShowContainer(true);
          }}
        >
          {movieGerne}
        </div>
        {showContainer && (
          <Link
            to={`/${movieGerne}`}
            style={{ textDecoration: "inherit" }}
            className="font-bold text-lime-300 text-2xl mt-3 mb-3"
          >
            Explore All
          </Link>
        )}
      </Stack>

      <Swiper slidesPerView={6} spaceBetween={8}>
        {!isFetching &&
          data.results.map((movieDetail: Movie) => (
            <SwiperSlide key={movieDetail.id}>
              <div className="static" onClick={toWatchPage}>
                <img
                  className="rounded-lg"
                  src={`${IMG_URL}${movieDetail.backdrop_path}`}
                />
              </div>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
}
