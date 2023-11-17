import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserData, RoleData, ViewUserData, PermissionData, ViewRoleData, PermissionSetData } from "../../types/Movie"




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
        getRoleName: build.query<ViewRoleData, string>({
            query: (roleIds) => ({
                url: `/Account/Role/${roleIds}`,
            }),
        }),
        getUserById: build.query<ViewUserData, string>({
            query: (id) => ({
                url: `/Account/User/${id}`,
            }),
        }),
        getPermission: build.query<PermissionData, void>({
            query: () => ({
                url: `/Account/Permission`,
            }),
        }),
        getPermissionSet: build.query<PermissionSetData, void>({
            query: () => ({
                url: `/Account/PermissionSet`,
            }),
        }),
        getPermissionSetById: build.query<PermissionSetData, void>({
            query: (perId) => ({
                url: `/Account/PermissionSet/${perId}`,
            }),
        })
    })
})

export const { useGetAllUserQuery, useGetRoleQuery, useGetUserByIdQuery, useGetRoleNameQuery, useGetPermissionQuery, useGetPermissionSetQuery , useGetPermissionSetByIdQuery} = getUserApi
