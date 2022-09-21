import { renderRoute } from 'utils/test-utils';
import * as paths from 'pages/paths';
import { screen, waitFor } from '@testing-library/react';
import user from '@testing-library/user-event';
import { mockProducts } from 'mocks/mockData';

test('Product page is rendered', async () => {
  renderRoute({ route: paths.productsById(1) });
  expect(
    screen.getByRole('heading', { name: /product 1/i })
  ).toBeInTheDocument();
  expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
  expect(
    screen.getByRole('button', { name: /update product/i })
  ).toBeInTheDocument();

  await waitFor(() => {
    expect(screen.getByLabelText(/name/i)).toHaveValue(mockProducts[0].name);
  });
  expect(screen.getByLabelText(/price/i)).toHaveValue(mockProducts[0].price);
});

test('Product is updated when update button is pressed', async () => {
  const { store } = renderRoute({ route: paths.productsById(1) });

  expect(store.getState().products.ids).toHaveLength(0);
  await waitFor(() => {
    expect(store.getState().products.ids).toHaveLength(1);
  });

  const nameInput = screen.getByLabelText(/name/i);
  const priceInput = screen.getByLabelText(/price/i);

  user.clear(nameInput);
  user.type(nameInput, 'Update product');
  user.clear(priceInput);
  user.type(priceInput, '12345');
  user.click(screen.getByRole('button', { name: /update product/i }));

  await waitFor(() => {
    const productsArr = Object.values(store.getState().products.entities);
    expect(productsArr).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: 'Update product', price: 12345 }),
      ])
    );
  });
});
