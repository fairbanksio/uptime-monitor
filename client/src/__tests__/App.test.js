import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';

test('App renders and redirects to login page', async () => {
  render(<App />);
  
  await waitFor(() => {
    expect(screen.getByText('Login')).toBeInTheDocument()
  })
});
