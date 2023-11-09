import { createSlice } from "@reduxjs/toolkit"

interface ImageState {
    registerId: string
}

const initialState: ImageState = {
    registerId: ''
}

const registerSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
})

const registerReducer = registerSlice.reducer

export default registerReducer;