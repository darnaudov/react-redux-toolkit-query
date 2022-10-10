import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from 'redux/store';
import { auth } from 'auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  UserInfo,
  updateEmail,
  updatePassword,
} from 'firebase/auth';
import { Loading } from 'redux/commonTypes';

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

export const loginUser = createAsyncThunk(
  'user/login',
  async (arg: UserCredentials, thunkApi) => {
    const { email, password } = arg;
    const res = await signInWithEmailAndPassword(auth, email, password);
    return res.user.providerData[0];
  }
);

export const logOutUser = createAsyncThunk(
  'user/logout',
  async (arg, thunkApi) => {
    const res = await signOut(auth);
    return res;
  }
);

export const resetPassword = createAsyncThunk(
  'user/resetPassword',
  async (arg: { email: string }, thunkApi) => {
    const { email } = arg;
    const res = await sendPasswordResetEmail(auth, email);
    return res;
  }
);

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (arg: UserCredentials, thunkApi) => {
    const { email, password } = arg;
    if (auth.currentUser) {
      if (email) {
        updateEmail(auth.currentUser, email);
      }
      if (password) {
        updatePassword(auth.currentUser, password);
      }
    }
  }
);

export type UserType = {
  loading: Loading;
  data: UserInfo | null;
};

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loading: Loading.idle,
    data: null,
  } as UserType,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(signUpUser.pending, (state, action) => {
        state.loading = Loading.pending;
      })
      .addCase(signUpUser.fulfilled, (state, action) => {
        state.loading = Loading.fulfilled;
        state.data = action.payload;
      })
      .addCase(signUpUser.rejected, (state, action) => {
        state.loading = Loading.rejected;
      })
      .addCase(loginUser.pending, (state, action) => {
        state.loading = Loading.pending;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = Loading.fulfilled;
        state.data = action.payload;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = Loading.rejected;
      })
      .addCase(logOutUser.pending, (state, action) => {
        state.loading = Loading.pending;
      })
      .addCase(logOutUser.fulfilled, (state, action) => {
        state.loading = Loading.fulfilled;
        state.data = null;
      })
      .addCase(logOutUser.rejected, (state, action) => {
        state.loading = Loading.rejected;
      });
  },
});

export const selectUser = (state: RootState) => state.user.data;
export const selectUserLoading = (state: RootState) => state.user.loading;

export default userSlice.reducer;
