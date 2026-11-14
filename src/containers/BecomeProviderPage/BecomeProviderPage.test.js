import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import BecomeProviderPage from './BecomeProviderPage';

const { waitFor } = testingLibrary;

describe('BecomeProviderPage', () => {
  it('renders the hero and sends the primary CTA to signup', async () => {
    const { getByRole, getAllByRole } = render(<BecomeProviderPage />);
    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent(
        'Build a business, not just a skill'
      );
      const signupLinks = getAllByRole('link', { name: 'Start your application' });
      expect(signupLinks[0]).toHaveAttribute('href', '/signup');
    });
  });
});
