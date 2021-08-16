import { render, screen } from '@testing-library/react';
import App from '../views/App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Uptime Monitor/i);
  expect(linkElement).toBeInTheDocument();
});
