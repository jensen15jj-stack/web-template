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
  sectionName: 'Our Community',
  sectionId: 'community',
  numColumns: 1,
  title: { fieldType: 'heading2', content: 'What do you need done?' },
  blocks: [],
};

describe('LandingPage custom sections', () => {
  it('uses the split hero when the first section is a hero or article', () => {
    const data = withCustomSections({ sections: [heroSection, columnsSection] });
    expect(data.sections[0].sectionType).toEqual('heroSplit');
    expect(data.sections[1].sectionType).toEqual('columns');
    expect(data.sections.map(s => s.sectionId)).toEqual(
      expect.arrayContaining(['reviews', 'service-area', 'faq'])
    );
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
      expect(getByText('LandingSections.reviewsTitle')).toBeInTheDocument();
      expect(getByText('LandingSections.faq.payment.question')).toBeInTheDocument();
    });
  });
});

describe('LandingPage block-based custom sections', () => {
  it('renders service tiles as links, numbered steps and checks', async () => {
    const block = (id, title, text) => ({
      blockType: 'defaultBlock',
      blockId: id,
      title: { fieldType: 'heading3', content: title },
      text: { fieldType: 'markdown', content: text },
    });
    const sections = [
      heroSection,
      {
        sectionType: 'columns',
        sectionName: 'Browse services',
        sectionId: 'services',
        title: { fieldType: 'heading2', content: 'What do you need done?' },
        blocks: [
          block('yard', 'Yard Work', 'Mowing.\n\n[Browse providers](/s?pub_categoryLevel1=yard)'),
        ],
      },
      {
        sectionType: 'columns',
        sectionName: 'How it works',
        sectionId: 'how',
        title: { fieldType: 'heading2', content: 'Three steps' },
        blocks: [block('s1', '1. Search', 'Browse providers near you.')],
      },
      {
        sectionType: 'columns',
        sectionName: 'What verified means',
        sectionId: 'verified',
        title: { fieldType: 'heading2', content: 'What verified means here' },
        blocks: [block('c1', 'Identity checked', 'The person on the profile shows up.')],
      },
    ];

    const { getByRole, getByText } = render(
      <LandingPageComponent
        pageAssetsData={{ landingPage: { data: { sections } } }}
        inProgress={false}
        error={null}
      />
    );

    await waitFor(() => {
      const tile = getByRole('link', { name: /Yard Work/ });
      expect(tile).toHaveAttribute('href', '/s?pub_categoryLevel1=yard');
      expect(tile).toHaveTextContent('Mowing.');
      // The step number is drawn by the design, so it is removed from the title.
      expect(getByRole('heading', { level: 3, name: 'Search' })).toBeInTheDocument();
      expect(getByText('Identity checked')).toBeInTheDocument();
      expect(getByRole('link', { name: 'LandingSections.checksLink' })).toHaveAttribute(
        'href',
        '/trust-and-safety'
      );
    });
  });
});
