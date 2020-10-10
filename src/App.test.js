import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders initial screen', () => {
  const { getByText } = render(<App />);

  const header = getByText(/What is the interval\?/);
  const button1 = getByText(/1/);
  const button2 = getByText(/2/);
  const button3 = getByText(/3/);
  const button4 = getByText(/4/);
  const button5 = getByText(/5/);
  const button6 = getByText(/6/);
  const button7 = getByText(/7/);

  expect(header).toBeInTheDocument();
  expect(button2).toBeInTheDocument();
  expect(button3).toBeInTheDocument();
  expect(button4).toBeInTheDocument();
  expect(button5).toBeInTheDocument();
  expect(button6).toBeInTheDocument();
  expect(button7).toBeInTheDocument();
});
