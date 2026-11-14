// Content for the Find a Provider page.

const searchHref = category => `/s?pub_categoryLevel1=${category}`;

const tile = (blockId, title, text, category) => ({
  blockType: 'defaultBlock',
  blockId,
  title: { fieldType: 'heading3', content: title },
  text: {
    fieldType: 'markdown',
    content: `${text}\n\n[Browse providers](${searchHref(category)})`,
  },
});

const step = (blockId, title, text) => ({
  blockType: 'defaultBlock',
  blockId,
  title: { fieldType: 'heading3', content: title },
  text: { fieldType: 'markdown', content: text },
});

export const findProviderPageData = {
  meta: {
    pageTitle: { fieldType: 'metaTitle', content: 'Find a provider | American Neighbor' },
    pageDescription: {
      fieldType: 'metaDescription',
      content:
        'Browse verified providers from the military community near Goldsboro, North Carolina.',
    },
  },
  sections: [
    {
      sectionType: 'pageHero',
      sectionId: 'find-hero',
      tone: 'navy',
      eyebrowText: 'Find a provider',
      titleText: 'Find trusted local help',
      descriptionText:
        'Browse verified providers from the military community near Goldsboro, North Carolina. Every provider is checked before they can list.',
      ctaHref: '/s',
      ctaLabel: 'Browse all providers',
      secondaryHref: '/trust-and-safety',
      secondaryLabel: 'How verification works',
    },
    {
      sectionType: 'serviceTiles',
      sectionId: 'find-categories',
      title: { fieldType: 'heading2', content: 'Browse by service' },
      description: {
        fieldType: 'paragraph',
        content: 'Pick a category to see the providers who can help.',
      },
      blocks: [
        tile(
          'furniture',
          'Furniture Assembly',
          'Beds, desks, shelves, and flat-pack builds.',
          'furniture'
        ),
        tile('moving', 'Moving & Packing', 'Loading, hauling, and PCS help.', 'moving'),
        tile(
          'mounting',
          'Mounting & Installation',
          'TVs, shelves, and fixtures hung right.',
          'mounting'
        ),
        tile('yard', 'Yard Work & Lawn Care', 'Mowing, trimming, cleanup, and upkeep.', 'yard'),
        tile(
          'repair',
          'Home Repairs & Handyman',
          "The fix-it list you haven't gotten to.",
          'repair'
        ),
        tile(
          'Cleaning',
          'Cleaning Service',
          'Home and office cleaning on your schedule.',
          'Cleaning'
        ),
        tile(
          'Trades',
          'Skilled Trades',
          'Hands-on work from people trained to do it right.',
          'Trades'
        ),
        tile(
          'professional',
          'Professional Service',
          'Expertise for your household or business.',
          'professional'
        ),
      ],
    },
    {
      sectionType: 'steps',
      sectionId: 'find-how',
      title: { fieldType: 'heading2', content: 'How it works' },
      description: {
        fieldType: 'paragraph',
        content: 'From search to done in three steps.',
      },
      blocks: [
        step('search', 'Search', 'Browse verified providers near you by service and location.'),
        step('book', 'Book and pay', 'Pick your provider, set the time, and pay securely online.'),
        step(
          'done',
          'Get it done',
          'Your job gets handled, then you rate the work so your neighbors know who to call.'
        ),
      ],
    },
    {
      sectionType: 'pageHero',
      sectionId: 'find-cta',
      headingLevel: 2,
      tone: 'navy',
      titleText: 'Ready to get started?',
      descriptionText: 'See everyone available in your area right now.',
      ctaHref: '/s',
      ctaLabel: 'Browse all providers',
    },
  ],
};
