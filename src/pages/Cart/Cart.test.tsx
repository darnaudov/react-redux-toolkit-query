import { screen, waitFor } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { renderRoute } from 'utils/test-utils';
import { addProductToCart } from 'redux/slices/cartItems';
import { mockProducts } from 'mocks/mockData';
import { productsApi, selectAllProducts } from 'redux/slices/productsApi';
import * as paths from 'pages/paths';

test('Cart page renders', () => {
  renderRoute({
    route: paths.cart(),
  });

  expect(screen.getByRole('heading', { name: /cart/i })).toBeInTheDocument();
  expect(screen.getByText(/total price/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /clear cart/i })
  ).toBeInTheDocument();
});

test('Cart items are added and displayed on the page', async () => {
  const { store } = renderRoute({
    route: paths.cart(),
  });

  act(() => {
    store.dispatch(productsApi.endpoints.getProducts.initiate());
  });
  await waitFor(() => {
    expect(selectAllProducts(store.getState())).toHaveLength(
      mockProducts.length
    );
  });

  act(() => {
    store.dispatch(addProductToCart(1));
    store.dispatch(addProductToCart(2));
    store.dispatch(addProductToCart(3));
  });

  await waitFor(() => {
    expect(screen.getAllByTestId('cart-item')).toHaveLength(3);
  });

  expect(screen.getAllByRole('button', { name: /\-/i })).toHaveLength(3);
  expect(screen.getAllByRole('button', { name: /\+/i })).toHaveLength(3);
  expect(screen.queryByText(/total price: \$0/i)).not.toBeInTheDocument();

  for (let product of mockProducts) {
    expect(screen.getByText(new RegExp(product.name, 'i'))).toBeInTheDocument();
  }
});
