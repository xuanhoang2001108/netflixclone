import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { Movie } from "../../types/Movie"


export const getUserApi = createApi({
    reducerPath: 'getUserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://api.themoviedb.org/3/movie' }),
    endpoints: build => ({
        getCurrentUser: build.query<Movie, void>({
            query: () => ({
                url: "/popular",
                params: { },
            }),
        }),
    

    })
})

export const { useLazyGetCurrentUserQuery } = getUserApi
