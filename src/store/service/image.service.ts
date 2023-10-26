import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { MovieDetail, Results } from "../../types/Movie"


export const TMDB_API_KEY = "773ab8bcfd80d1984b90bf3aeb3cd893"

export const imgApi = createApi({
    reducerPath: 'imgApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/movie' }),
    endpoints: build => ({
        getPopular: build.query<Results[], void>({
            query: () => ({
                url: "/popular",
                params: { api_key: TMDB_API_KEY },
            }),
        }),
        getTopRated: build.query<Results[], void>({
            query: () => ({
                url: "/top_rated",
                params: { api_key: TMDB_API_KEY },
            }),
        }),
        getNowPlaying: build.query<Results[], void>({
            query: () => ({
                url: "/now_playing",
                params: { api_key: TMDB_API_KEY },
            }),
        }),
        getAppendedVideos: build.query<
            MovieDetail,
            { id: number }
        >({
            query: ({ id }) => ({
                url: `/${id}`,
                params: { api_key: TMDB_API_KEY, append_to_response: "videos" },
            }),
        }),
    
    })
})

export const { useGetPopularQuery, useGetTopRatedQuery, useGetNowPlayingQuery, useGetAppendedVideosQuery, useLazyGetAppendedVideosQuery } = imgApi
