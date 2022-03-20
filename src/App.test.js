import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App on load', () => {
  render(<App />);
  const linkElement = screen.getByText(/upload csv/i);
  expect(linkElement).toBeInTheDocument();
});
