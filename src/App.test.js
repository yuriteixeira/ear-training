import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

it('renders initial screen, with START call to action', () => {
  const { getByText } = render(<App />);
  const header = getByText(/Ear Trainer/);
  const start = getByText(/START/);
  expect(header).toBeInTheDocument();
  expect(start).toBeInTheDocument();
});
