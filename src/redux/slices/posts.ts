import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../axios';
import { Posts } from '../../interface/interfaces';

interface State {
  posts: [] | Posts[];
  status: 'loading' | 'loaded' | 'error';
}

const initialState: State = {
  posts: [],
  status: 'loading',
};

export const fetchPosts = createAsyncThunk('fetchPosts', async () => {
  const response = await axios.get('/posts');
  return response.data;
});

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading';
        state.posts = [];
      })
      .addCase(
        fetchPosts.fulfilled,
        (state, action: PayloadAction<Posts[]>) => {
          state.status = 'loaded';
          state.posts = action.payload;
        }
      )
      .addCase(fetchPosts.rejected, (state) => {
        state.status = 'error';
        state.posts = [];
      });
  },
});

export default postsSlice.reducer;
