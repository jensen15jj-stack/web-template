import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import ContactPage from './ContactPage';

const { waitFor } = testingLibrary;

describe('ContactPage', () => {
  it('renders the contact form and direct contact methods', async () => {
    const { getByRole, getByLabelText } = render(<ContactPage />);
    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent("We're here to help");
      expect(getByLabelText('Your name')).toBeInTheDocument();
      expect(getByLabelText('How can we help?')).toBeInTheDocument();
      expect(getByRole('button', { name: 'Send message' })).toBeInTheDocument();
    });
  });
});
