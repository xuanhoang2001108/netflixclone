import { configureStore } from '@reduxjs/toolkit'
import imgReducer from './Slice/image.slice'
import { imgApi } from './service/video.service'
import userReducer from './Slice/auth.slice'
import { getUserApi } from './service/getUser.service'
import { registerApi } from './service/register.service'
import registerReducer from './Slice/register.slice'


export const store = configureStore({
  reducer: {
    img: imgReducer,
    [imgApi.reducerPath]: imgApi.reducer,
    user: userReducer,
    [getUserApi.reducerPath]: getUserApi.reducer,
    register: registerReducer,
    [registerApi.reducerPath]: registerApi.reducer,
    // auth: authReducer
  },

  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(imgApi.middleware, getUserApi.middleware, registerApi.middleware),

})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch