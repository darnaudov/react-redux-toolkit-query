import { screen, waitFor, within } from '@testing-library/react';
import user from '@testing-library/user-event';
import { renderRoute } from 'utils/test-utils';
import { mockProducts } from 'mocks/mockData';
import { selectAllProducts } from 'redux/slices/productsApi';
import { selectTotalCartItems } from 'redux/slices/cartItems';
import * as paths from 'pages/paths';

test('Products page renders', () => {
  renderRoute({ route: paths.products() });
  expect(
    screen.getByRole('heading', {
      name: /products/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole('link', {
      name: /add new product/i,
    })
  ).toBeInTheDocument();
});

test('Products are fetched and rendered', async () => {
  renderRoute({ route: paths.products() });
  const productsCount = mockProducts.length;
  const products = await screen.findAllByTestId('product');

  expect(products).toHaveLength(productsCount);
  expect(screen.getAllByRole('button', { name: /add to cart/i })).toHaveLength(
    productsCount
  );
  expect(screen.getAllByRole('button', { name: /delete/i })).toHaveLength(
    productsCount
  );
  expect(screen.getAllByRole('link', { name: /edit/i })).toHaveLength(
    productsCount
  );

  for (let product of mockProducts) {
    expect(
      screen.getByText(new RegExp(`${product.name} ${product.price}`, 'i'))
    ).toBeInTheDocument();
  }
});

test('Product is added to cart when "Add to cart" button is pressed', async () => {
  const { store } = renderRoute({ route: paths.products() });
  const products = await screen.findAllByTestId('product');
  const cartLink = screen.getByRole('link', {
    name: /cart \(0\)/i,
  });
  const addToCartBtn = within(products[0]).getByRole('button', {
    name: /add to cart/i,
  });

  expect(selectTotalCartItems(store.getState())).toBe(0);
  user.click(addToCartBtn);
  await waitFor(() => {
    expect(cartLink).toHaveTextContent(/cart \(1\)/i);
  });
  expect(selectTotalCartItems(store.getState())).toBe(1);
});

test('Product is deleted when "delete" button is pressed', async () => {
  const { store } = renderRoute({ route: paths.products() });
  const products = await screen.findAllByTestId('product');
  expect(products).toHaveLength(3);
  expect(selectAllProducts(store.getState())).toHaveLength(3);

  const deleteBtn = within(products[0]).getByRole('button', {
    name: /delete/i,
  });
  user.click(deleteBtn);

  await waitFor(async () => {
    const productsAfterDelete = await screen.findAllByTestId('product');
    expect(productsAfterDelete).toHaveLength(2);
  });
  expect(selectAllProducts(store.getState())).toHaveLength(2);
});

test('Add new product link navigates to new product page', async () => {
  renderRoute({ route: paths.products() });
  const addNewProductLink = screen.getByRole('link', {
    name: /add new product/i,
  });
  user.click(addNewProductLink);
  const newProductHeading = await screen.findByRole('heading', {
    name: /new product/i,
  });
  expect(newProductHeading).toBeInTheDocument();
});
