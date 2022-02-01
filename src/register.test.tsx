import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import userEvent from '@testing-library/user-event';

import App from './App';

test('form render', () => {
  const { getByLabelText } = render(<App />);

  expect(getByLabelText(/Name/i)).toBeInTheDocument();
  expect(getByLabelText(/email/i)).toBeInTheDocument();
  // expect(getByLabelText(/test/i)).toBeInTheDocument(); //Error
});

test('password show-hide work', () => {
  const { getByLabelText, getByRole } = render(<App />);
});
