import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Token, UserLoginData } from "../../types/Movie";

export const loginApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.100.60:61949/api/Account/" }),
    endpoints: (build) => ({
        logIn: build.mutation<UserLoginData, Omit<Token, 'accessToken'>>({
            query(body) {
                return {
                    url: 'Auth/Login',
                    method: 'POST',
                    body
                }
            },
        }),

    }),
})

export const { useLogInMutation } = loginApi;
