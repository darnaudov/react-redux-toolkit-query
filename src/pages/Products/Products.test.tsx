import {
  fireEvent,
  screen,
  waitFor,
  waitForElementToBeRemoved,
  within,
} from '@testing-library/react';
import user from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import { renderRoute } from 'utils/test-utils';

test('Products page renders', () => {
  renderRoute({ route: '/products' });
  const productsHeading = screen.getByRole('heading', {
    name: /products/i,
  });
  expect(productsHeading).toBeInTheDocument();
});

test('Products are fetched and rendered', async () => {
  renderRoute({ route: '/products' });
  const products = await screen.findAllByTestId('product');
  expect(products).toHaveLength(3);
});

test('Product is added to cart when "Add to cart" button is pressed', async () => {
  const { store } = renderRoute({ route: '/products' });
  const products = await screen.findAllByTestId('product');
  const cartLink = screen.getByRole('link', {
    name: /cart \(0\)/i,
  });
  const addToCartBtn = within(products[0]).getByRole('button', {
    name: /add to cart/i,
  });

  expect(store.getState().cartItems.ids).toHaveLength(0);
  user.click(addToCartBtn);
  await waitFor(() => {
    expect(cartLink).toHaveTextContent(/cart \(1\)/i);
  });
  expect(store.getState().cartItems.ids).toHaveLength(1);
});

test('Product is deleted when "delete" button is pressed', async () => {
  const { store } = renderRoute({ route: '/products' });
  const products = await screen.findAllByTestId('product');
  expect(products).toHaveLength(3);
  expect(store.getState().products.ids).toHaveLength(3);

  const deleteBtn = within(products[0]).getByRole('button', {
    name: /delete/i,
  });
  user.click(deleteBtn);

  await waitFor(async () => {
    const productsAfterDelete = await screen.findAllByTestId('product');
    expect(productsAfterDelete).toHaveLength(2);
  });
  expect(store.getState().products.ids).toHaveLength(2);
});

test('Add new product link works', async () => {
  renderRoute({ route: '/products' });
  const addNewProductLink = screen.getByRole('link', {
    name: /add new product/i,
  });
  user.click(addNewProductLink);
  const newProductHeading = await screen.findByRole('heading', {
    name: /new product/i,
  });
  expect(newProductHeading).toBeInTheDocument();
});

// test('Edit product link works', async () => {
//   renderRoute({ route: '/products' });
//   const editProductLinks = await screen.findAllByRole('link', {
//     name: /edit/i,
//   });
//   user.click(editProductLinks[0]);
//   const priceInput = await screen.findByText(/price:/i);
//   const textbox = await within(priceInput).findByDisplayValue(/1400/i);
//   expect(textbox).toBeInTheDocument();

//   // const newProductHeading = await screen.findByRole('heading', {
//   //   name: /product/i,
//   // });
//   // expect(newProductHeading).toBeInTheDocument();
// });