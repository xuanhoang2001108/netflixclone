import { createSlice } from "@reduxjs/toolkit"

interface ImageState {
    userId: string
}

const initialState: ImageState = {
    userId: ''
}

const userSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
})

const userReducer = userSlice.reducer

export default userReducer;