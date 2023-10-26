import { configureStore } from '@reduxjs/toolkit'
import imgReducer from './Slice/image.slice'
import { imgApi } from './service/image.service'

// import { trailerApi } from './service/trailer.service'
// ...

export const store = configureStore({
  reducer: {
    img: imgReducer,
    // trailer: trailerReducer,
    // [trailerApi.reducerPath]: trailerApi.reducer,
    [imgApi.reducerPath]: imgApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imgApi.middleware),
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch