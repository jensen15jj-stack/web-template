import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import { PrivacyPolicyPageComponent } from './PrivacyPolicyPage';

const { waitFor } = testingLibrary;

describe('PrivacyPolicyPage', () => {
  it('renders the built-in American Neighbor text even when Console content fails to load', async () => {
    const errorMessage = 'PrivacyPolicyPage failed';
    let e = new Error(errorMessage);
    e.type = 'error';
    e.name = 'Test';

    const { getByText } = render(
      <PrivacyPolicyPageComponent pageAssetsData={null} inProgress={false} error={e} />
    );

    await waitFor(() => {
      expect(getByText('Privacy Policy')).toBeInTheDocument();
      expect(getByText('1. Who we are')).toBeInTheDocument();
    });
  });
});
