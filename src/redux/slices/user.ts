import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState, store } from 'redux/store';
import { auth } from 'auth';
import {
  createUserWithEmailAndPassword,
  UserInfo,
  onAuthStateChanged,
} from 'firebase/auth';

export interface UserCredentials {
  email: string;
  password: string;
}

export const signUpUser = createAsyncThunk(
  'user/signup',
  async (arg: UserCredentials, thunkApi) => {
    const { email, password } = arg;
    const res = await createUserWithEmailAndPassword(auth, email, password);
    return res.user.providerData[0];
  }
);

onAuthStateChanged(auth, (user) => {
  store.dispatch({
    type: signUpUser.fulfilled.type,
    payload: user ? user.providerData[0] : null,
  });
});

type InitialStateType = UserInfo | null;

const userSlice = createSlice({
  name: 'user',
  initialState: null as InitialStateType,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signUpUser.fulfilled, (state, action) => {
      return action.payload;
    });
  },
});

export const selectUser = (state: RootState) => state.user;

export default userSlice.reducer;
