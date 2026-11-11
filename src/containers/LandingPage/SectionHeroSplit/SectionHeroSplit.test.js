import React from 'react';
import '@testing-library/jest-dom';

import { renderWithProviders as render, testingLibrary } from '../../../util/testHelpers';

import { LandingPageComponent, withCustomSections } from '../LandingPage';

const { waitFor } = testingLibrary;

const heroSection = {
  sectionType: 'article',
  sectionId: 'hero',
  title: { fieldType: 'heading1', content: 'Your Task. Their Mission' },
  description: { fieldType: 'paragraph', content: 'Hire a verified American Neighbor.' },
  callToAction: { fieldType: 'none' },
  blocks: [],
};

const columnsSection = {
  sectionType: 'columns',
  sectionId: 'services',
  numColumns: 1,
  title: { fieldType: 'heading2', content: 'What do you need done?' },
  blocks: [],
};

describe('LandingPage custom sections', () => {
  it('uses the split hero when the first section is a hero or article', () => {
    const data = withCustomSections({ sections: [heroSection, columnsSection] });
    expect(data.sections[0].sectionType).toEqual('heroSplit');
    expect(data.sections[1].sectionType).toEqual('columns');
  });

  it('leaves other first sections and empty pages untouched', () => {
    const data = { sections: [columnsSection, heroSection] };
    expect(withCustomSections(data)).toBe(data);
    expect(withCustomSections(null)).toBe(null);
    expect(withCustomSections({ sections: [] })).toEqual({ sections: [] });
  });

  // Note: the test setup renders translation keys instead of translated text.
  it('renders the split hero with Console content and the verification card', async () => {
    const { getByText, getByRole } = render(
      <LandingPageComponent
        pageAssetsData={{ landingPage: { data: { sections: [heroSection, columnsSection] } } }}
        inProgress={false}
        error={null}
      />
    );

    await waitFor(() => {
      expect(getByRole('heading', { level: 1 })).toHaveTextContent('Your Task. Their Mission');
      expect(getByText('Hire a verified American Neighbor.')).toBeInTheDocument();
      expect(getByText('SectionHeroSplit.checksTitle')).toBeInTheDocument();
      expect(getByRole('link', { name: 'SectionHeroSplit.becomeProvider' })).toHaveAttribute(
        'href',
        '/p/becomeaprovider'
      );
      expect(getByText('What do you need done?')).toBeInTheDocument();
    });
  });
});
