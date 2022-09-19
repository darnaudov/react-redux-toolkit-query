import { render, screen } from '@testing-library/react';
import Home from './Home';

test('Home page renders successfully', () => {
  render(<Home />);
  const titleElement = screen.getByRole('heading', {
    name: /home/i,
  });
  expect(titleElement).toBeInTheDocument();
  const wellcomeElement = screen.getByText(/wellcome user/i);
  expect(wellcomeElement).toBeInTheDocument();
});
