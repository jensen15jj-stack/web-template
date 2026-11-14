import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import FindProviderPage from './FindProviderPage';

const { waitFor } = testingLibrary;

describe('FindProviderPage', () => {
  it('renders the hero and category tiles that link into search', async () => {
    const { getByRole } = render(<FindProviderPage />);
    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent('Find trusted local help');
      expect(getByRole('link', { name: /Yard Work/ })).toHaveAttribute(
        'href',
        '/s?pub_categoryLevel1=yard'
      );
    });
  });
});
