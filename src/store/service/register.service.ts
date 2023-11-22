import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AddPolicyData, AddRoleData, PermissionData, PermissionSetData, UserRegisterData } from "../../types/Movie"

export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.100.60:56367/api/Account/" }),
    endpoints: (build) => ({
        addAccount: build.mutation<UserRegisterData, Omit<UserRegisterData, 'id'>>({
            query(body) {
                return {
                    url: '/User',
                    method: 'POST',
                    body,

                }
            }
        }),
        addRole: build.mutation<AddRoleData, Omit<AddRoleData, 'id'>>({
            query(body) {
                return {
                    url: '/Role',
                    method: 'POST',
                    body,

                }
            }
        }),
        addPermission: build.mutation<PermissionData, Omit<PermissionData, 'id'>>({
            query(body) {
                return {
                    url: '/Permission',
                    method: 'POST',
                    body,

                }
            }
        }),
        addPolicy: build.mutation<PermissionData, Omit<AddPolicyData, 'id'>>({
            query(body) {
                return {
                    url: '/PermissionSet',
                    method: 'POST',
                    body,

                }
            }
        }),
        deleteAccount: build.mutation<{}, Omit<{}, 'id'>>({
            query(id) {
                return {
                    url: `user/${id}`,
                    method: 'DELETE',
                }
            }
        }),
        editPhoneNumber: build.mutation<{}, { id: string; phoneNumber: string }>({
            query: ({ id, phoneNumber }) => ({
                url: `User/UpdatePhoneNumber?phoneNumber=${phoneNumber}&id=${id}`,
                method: 'PUT',
            }),
        }),
        editRole: build.mutation<{}, { id: string, permissionSetIds: string[], name: string }>({
            query: ({ id, permissionSetIds, name }) => ({
                url: `/Role/${id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, permissionSetIds })

            }),

        }),
        editPermission: build.mutation<{}, { id: string, sort: number, name: string }>({
            query: ({ id, sort, name }) => ({
                url: `/Permission/${id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, sort })

            }),
        }),
        editPolicy: build.mutation<{}, { id: string, description: string, name: string, permissionIdList: string[] }>({
            query: ({ id, description, name, permissionIdList }) => ({
                url: `/PermissionSet/${id}`,
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id, name, description, permissionIdList })

            }),
        }),
        deleteRole: build.mutation<{}, Omit<{}, 'id'>>({
            query(id) {
                return {
                    url: `Role/${id}`,
                    method: 'DELETE',
                }
            }
        }),

        deletePermission: build.mutation<{}, Omit<{}, 'id'>>({
            query(id) {
                return {
                    url: `Permission/${id}`,
                    method: 'DELETE',
                }
            }
        }),
        deletePermissionSet: build.mutation<{}, Omit<{}, 'id'>>({
            query(id) {
                return {
                    url: `PermissionSet/${id}`,
                    method: 'DELETE',
                }
            }
        }),
    }),

})

export const { useAddPolicyMutation, useEditPolicyMutation, useDeletePermissionSetMutation, useEditPermissionMutation, useDeletePermissionMutation, useAddPermissionMutation, useAddAccountMutation, useDeleteRoleMutation, useDeleteAccountMutation, useEditPhoneNumberMutation, useAddRoleMutation, useEditRoleMutation } = registerApi 