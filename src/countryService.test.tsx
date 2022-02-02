import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom/extend-expect';

import App from './App';
import { getCountries } from './CountryService';

const server = setupServer(
  rest.get(
    'https://61d18fc6da87830017e5928b.mockapi.io/productlist',
    (req, res, ctx) => {
      return res(ctx.json([1, 2, 3, 4]));
    }
  )
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('service response test', async () => {
  const { getByText, getByTestId } = render(<App />);

  const btnFetch = getByTestId('fetchBtn');

  fireEvent.click(btnFetch);

  await waitFor(() => getByText(/Success/i));
});

test('service failed test', async () => {
  server.use(
    rest.get(
      'https://61d18fc6da87830017e5928b.mockapi.io/productlidst', //broken test url
      (req, res, ctx) => {
        return res(ctx.status(404));
      }
    )
  );

  const { getByText, getByTestId } = render(<App />);

  const btnFetch = getByTestId('fetchBtn');

  fireEvent.click(btnFetch);

  await waitFor(() => getByText(/Fail/i));
});
