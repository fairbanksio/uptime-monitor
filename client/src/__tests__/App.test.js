import { render, screen } from '@testing-library/react';
import App from '../App';

test('renders Uptime Monitor link', () => {
  render(<App />);
  console.log(screen)
  const linkElement = screen.getByText(/Login/i);
  expect(linkElement).toBeInTheDocument();
});
