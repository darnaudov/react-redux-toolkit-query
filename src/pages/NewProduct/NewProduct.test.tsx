import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import user from '@testing-library/user-event';
import { renderRoute } from 'utils/test-utils';
import { productsApi, selectAllProducts } from 'redux/slices/productsApi';
import { mockProducts } from 'mocks/mockData';
import * as paths from 'pages/paths';

test('New product page is rendered', () => {
  renderRoute({ route: paths.productsNew() });
  expect(
    screen.getByRole('heading', { name: /new product/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /add product/i })
  ).toBeInTheDocument();
});

test('New product is added to the store', async () => {
  const { store } = renderRoute({ route: paths.productsNew() });

  act(() => {
    store.dispatch(productsApi.endpoints.getProducts.initiate());
  });
  await waitFor(() => {
    expect(selectAllProducts(store.getState())).toHaveLength(
      mockProducts.length
    );
  });

  const name = 'New product';
  const price = '12345';

  user.type(screen.getByLabelText(/name/i), name);
  user.type(screen.getByLabelText(/price/i), price);
  user.click(screen.getByRole('button', { name: /add product/i }));

  await waitFor(() => {
    expect(selectAllProducts(store.getState())).toHaveLength(
      mockProducts.length + 1
    );
  });

  const products = selectAllProducts(store.getState());
  expect(products).toEqual(
    expect.arrayContaining([
      expect.objectContaining({ name, price: parseInt(price) }),
    ])
  );
});
