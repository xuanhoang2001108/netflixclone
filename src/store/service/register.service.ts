import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { AddRoleData, UserRegisterData } from "../../types/Movie"

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
        deleteRole: build.mutation<{}, Omit<{}, 'id'>>({
            query(id) {
                return {
                    url: `Role/${id}`,
                    method: 'DELETE',
                }
            }
        }),
    }),

})

export const { useAddAccountMutation,useDeleteRoleMutation, useDeleteAccountMutation, useEditPhoneNumberMutation, useAddRoleMutation, useEditRoleMutation } = registerApi 