import { screen } from '@testing-library/react';
import { renderRoute } from 'utils/test-utils';

test('NotFound page renders successfully', () => {
  renderRoute({ route: '/not-existing-route' });
  expect(
    screen.getByRole('heading', {
      name: /not found/i,
    })
  ).toBeInTheDocument();
});
