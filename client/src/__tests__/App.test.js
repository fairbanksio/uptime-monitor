import { render, screen } from '@testing-library/react';
import App from './views/App';

test('renders Uptime Monitor link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Uptime Monitor/i);
  expect(linkElement).toBeInTheDocument();
});
