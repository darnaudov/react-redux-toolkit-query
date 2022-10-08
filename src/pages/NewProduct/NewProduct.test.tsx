// import { renderRoute } from 'utils/test-utils';
// import * as paths from 'pages/paths';
// import { screen, waitFor } from '@testing-library/react';
// import user from '@testing-library/user-event';

// test('New product page is rendered', () => {
//   renderRoute({ route: paths.productsNew() });
//   expect(
//     screen.getByRole('heading', { name: /new product/i })
//   ).toBeInTheDocument();
//   expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
//   expect(screen.getByLabelText(/price/i)).toBeInTheDocument();
//   expect(
//     screen.getByRole('button', { name: /add product/i })
//   ).toBeInTheDocument();
// });

// test('New product is added to the store', async () => {
//   const { store } = renderRoute({ route: paths.productsNew() });

//   user.type(screen.getByLabelText(/name/i), 'New product');
//   user.type(screen.getByLabelText(/price/i), '12345');
//   user.click(screen.getByRole('button', { name: /add product/i }));

//   expect(store.getState().products.ids).toHaveLength(0);
//   await waitFor(() => {
//     expect(store.getState().products.ids).toHaveLength(1);
//   });

//   const productsArr = Object.values(store.getState().products.entities);
//   expect(productsArr).toEqual(
//     expect.arrayContaining([
//       expect.objectContaining({ name: 'New product', price: 12345 }),
//     ])
//   );
// });

// TODO Temp
export {};
