import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import RoleData, { UserData } from "../../types/Movie"



export const getUserApi = createApi({
    reducerPath: 'getUserApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://192.168.100.60:56367/api/' }),
    endpoints: build => ({
        getAllUser: build.query<UserData, void>({
            query: () => ({
                url: "/Account/User",
            }),
        }),

        getRole: build.query<RoleData, void>({
            query: () => ({
                url: `/Account/Role`,
            }),
        }),
    })
})

export const { useGetAllUserQuery, useGetRoleQuery } = getUserApi
