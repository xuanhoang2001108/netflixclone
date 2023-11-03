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

    }),

})

export const { useAddAccountMutation } = registerApi 