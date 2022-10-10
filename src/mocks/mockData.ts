import { Loading } from 'redux/commonTypes';

export const mockUser = {
  loading: Loading.fulfilled,
  data: {
    providerId: 'password',
    uid: 'dummyemail@gmail.com',
    displayName: null,
    email: 'dummyemail@gmail.com',
    phoneNumber: null,
    photoURL: null,
  },
};

export const mockProducts = [
  {
    id: 1,
    name: 'MacBook',
    price: 1400,
  },
  {
    id: 2,
    name: 'Old Car',
    price: 2400,
  },
  {
    id: 3,
    name: 'W Shoes',
    price: 999,
  },
];
