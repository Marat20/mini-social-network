import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from '../../axios';
import { AuthUser, FormValues } from '../../interface/interfaces';

export const fetchLogin = createAsyncThunk(
  'auth/fetchLogin',
  async (params: FormValues) => {
    const { data } = await axios.post('/login', params);
    return data;
  }
);

export const fetchLoginMe = createAsyncThunk('auth/fetchLoginMe', async () => {
  const { data } = await axios.get('/login/me');
  return data;
});

export const fetchRegister = createAsyncThunk(
  'auth/fetchRegister',
  async (params: FormValues) => {
    const { data } = await axios.post('/register', params);

    return data;
  }
);

interface State {
  data: null | AuthUser;
  status: 'loading' | 'loaded' | 'error';
}

const initialState: State = {
  data: null,
  status: 'loading',
};

export const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.data = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLogin.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(
        fetchLogin.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.status = 'loaded';
          state.data = action.payload;
        }
      )
      .addCase(fetchLogin.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchLoginMe.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(
        fetchLoginMe.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.status = 'loaded';
          state.data = action.payload;
        }
      )
      .addCase(fetchLoginMe.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      })
      .addCase(fetchRegister.pending, (state) => {
        state.data = null;
        state.status = 'loading';
      })
      .addCase(
        fetchRegister.fulfilled,
        (state, action: PayloadAction<AuthUser>) => {
          state.status = 'loaded';
          state.data = action.payload;
        }
      )
      .addCase(fetchRegister.rejected, (state) => {
        state.status = 'error';
        state.data = null;
      });
  },
});

export default loginSlice.reducer;
export const { logout } = loginSlice.actions;
