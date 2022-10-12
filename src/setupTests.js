// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';
import { server } from 'mocks/server.ts';
import { store } from 'redux/store';
import { productsApi } from 'redux/slices/productsApi';
import { resetMockApi } from 'mocks/handlers';

beforeAll(() => server.listen());
afterEach(() => {
  server.resetHandlers();
  store.dispatch(productsApi.util.resetApiState());
  resetMockApi();
});
afterAll(() => server.close());
