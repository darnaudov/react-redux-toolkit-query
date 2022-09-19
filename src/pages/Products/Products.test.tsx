import { screen } from '@testing-library/react';
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
