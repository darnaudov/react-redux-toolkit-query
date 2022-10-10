import { screen } from '@testing-library/react';
import { renderRoute } from 'utils/test-utils';
import { mockUser } from 'mocks/mockData';
import * as paths from 'pages/paths';

test('Home page renders successfully', () => {
  renderRoute({ route: paths.home() });
  expect(
    screen.getByRole('heading', {
      name: /home/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByText(new RegExp(`wellcome ${mockUser.data.email}`, 'i'))
  ).toBeInTheDocument();
});
