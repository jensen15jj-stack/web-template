import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../util/testHelpers';

import TrustPage from './TrustPage';
import { trustPageData } from './trustPageData';

const { waitFor } = testingLibrary;

describe('TrustPage', () => {
  it('renders the page title, every badge and the non-affiliation notice', async () => {
    const { getByRole, getByText } = render(<TrustPage />);

    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent('Trust and safety');
      ['Identity', 'Military service', 'Military family', 'Background check'].forEach(badge => {
        expect(getByRole('heading', { level: 3, name: badge })).toBeInTheDocument();
      });
      expect(getByText('Not a government service')).toBeInTheDocument();
      expect(getByRole('link', { name: 'Find a provider' })).toHaveAttribute('href', '/s');
    });
  });

  it('gives every section and block a unique id', () => {
    const sectionIds = trustPageData.sections.map(s => s.sectionId);
    const blockIds = trustPageData.sections.flatMap(s => s.blocks.map(b => b.blockId));
    expect(new Set(sectionIds).size).toEqual(sectionIds.length);
    expect(new Set(blockIds).size).toEqual(blockIds.length);
  });
});
