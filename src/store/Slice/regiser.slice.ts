import { createSlice } from "@reduxjs/toolkit"



interface RegisterState {
    registerId: string
}

const initialState: RegisterState = {
    registerId: ''
}

const registerSlice = createSlice({
    name: 'register',
    initialState,
    reducers: {},
})

const registerReducer = registerSlice.reducer

export default registerReducer;