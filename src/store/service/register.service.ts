import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"
import { UserRegisterData } from "../../types/Movie"

export const registerApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.100.60:56367/api/Account/" }),
    endpoints: (build) => ({
        addAccount: build.mutation<UserRegisterData, Omit<UserRegisterData, 'id'>>({
            query(body) {
                return {
                    url: '/User/Register',
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

    }),

})

export const { useAddAccountMutation, useDeleteAccountMutation, useEditPhoneNumberMutation } = registerApi 