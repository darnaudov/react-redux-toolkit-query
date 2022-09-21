import { render, screen } from '@testing-library/react';
import NotFound from './NotFound';

test('NotFound page renders successfully', () => {
  render(<NotFound />);
  expect(
    screen.getByRole('heading', {
      name: /not found/i,
    })
  ).toBeInTheDocument();
});
