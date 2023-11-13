import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import RoleData, { UserData, ViewUserData } from "../../types/Movie"



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
        getRoleName: build.query<RoleData, string>({
            query: (roleIds) => ({
                url: `/Account/Role/${roleIds}`,
            }),
        }),
        getUserById: build.query<ViewUserData, string>({
            query: (id) => ({
                url: `/Account/User/${id}`,
            }),
        }),

    })
})

export const { useGetAllUserQuery, useGetRoleQuery, useGetUserByIdQuery, useGetRoleNameQuery} = getUserApi
