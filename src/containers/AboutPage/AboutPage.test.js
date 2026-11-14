import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import AboutPage from './AboutPage';

const { waitFor } = testingLibrary;

describe('AboutPage', () => {
  it('renders the heading and values', async () => {
    const { getByRole, getByText } = render(<AboutPage />);
    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent('Who we are');
      expect(getByText('Our mission')).toBeInTheDocument();
    });
  });
});
