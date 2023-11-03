import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { UserLoginData } from "../../types/Movie";

export const loginApi = createApi({
    reducerPath: 'registerApi',
    baseQuery: fetchBaseQuery({ baseUrl: "http://192.168.100.60:61949/api/Account/" }),
    endpoints: (build) => ({
        logIn: build.mutation<UserLoginData, Omit<UserLoginData, 'id'>>({
            query(body) {
                return {
                    url: 'Auth/Login',
                    method: 'POST',
                    body: JSON.stringify(body),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    
                }
            }
        })
    }),
})

export const { useLogInMutation } = loginApi;
