import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Snake title', () => {
  render(<App />);
  const titleElements = screen.getAllByText(/Snake/i);
  expect(titleElements.length).toBeGreaterThan(0);
});
