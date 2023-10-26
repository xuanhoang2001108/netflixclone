import { createSlice } from "@reduxjs/toolkit"

interface ImageState {
    imgId: string
}

const initialState: ImageState = {
    imgId: ''
}

const imgSlice = createSlice({
    name: 'images',
    initialState,
    reducers: {},
})

const imgReducer = imgSlice.reducer

export default imgReducer;