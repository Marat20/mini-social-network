import { configureStore } from '@reduxjs/toolkit';
import postsReducer from './slices/posts';
import authReducer from './slices/login';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    posts: postsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
