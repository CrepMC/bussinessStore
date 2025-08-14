// Auth slice placeholder
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api, setToken } from '../api';

export const login = createAsyncThunk(
  'auth/login',
  async ({ email, password }) => {
    const { data } = await api.post('/auth/login', { email, password });
    return data;
  }
);

const slice = createSlice({
  name: 'auth',
  initialState: { token: null, role: null },
  reducers: {
    logout: (s) => {
      s.token = null;
      s.role = null;
      setToken(null);
    },
  },
  extraReducers: (b) => {
    b.addCase(login.fulfilled, (s, a) => {
      s.token = a.payload.token;
      s.role = a.payload.role;
      setToken(s.token);
    });
  },
});

export const { logout } = slice.actions;
export default slice.reducer;
