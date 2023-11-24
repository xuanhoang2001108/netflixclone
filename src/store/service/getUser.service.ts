import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserData, RoleData, ViewUserData, PermissionData, ViewRoleData, PermissionSetData, ViewPermissionData, ViewPermissionSetData } from "../../types/Movie"

const accessToken = localStorage.getItem("accessToken")
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
        getPermissionById: build.query<ViewPermissionData, string>({
            query: (perId) => ({
                url: `/Account/Permission/${perId}?isDeep=true`,
            }),
        }),
        getPermissionSetById: build.query<ViewPermissionSetData, string>({
            query: (perId) => ({
                url: `/Account/PermissionSet/${perId}?isDeep=true`,
            }),
        }),
        getPermissionSet: build.query<PermissionSetData, void>({
            query: () => ({
                url: `/Account/PermissionSet?isDeep=true`,
            }),
        }),
        getCurrentUser: build.query<ViewUserData, void>({
            query: () => ({
                url: `/Account/User/GetCurrentUser?isDeep=true`,
                transformHeaders: (headers: any, _query: any) => {
                    if (accessToken) {
                        return {
                            ...headers,
                            Authorization: accessToken,
                        };
                    }
                    return headers;
                },
            }),
        }),
    })
})

export const { useGetPermissionByIdQuery, useGetAllUserQuery, useGetRoleQuery, useGetUserByIdQuery, useGetRoleNameQuery, useGetPermissionQuery, useGetPermissionSetQuery, useGetPermissionSetByIdQuery } = getUserApi
