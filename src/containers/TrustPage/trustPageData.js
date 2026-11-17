// Content for the Trust & safety page.
// The page is rendered with the same PageBuilder that renders Console pages,
// so it uses the same section and block data shapes.
//
// Only describe checks that American Neighbor actually performs.

const badgeBlock = (blockId, title, meaning, notMeaning) => ({
  blockType: 'defaultBlock',
  blockId,
  title: { fieldType: 'heading3', content: title },
  text: {
    fieldType: 'markdown',
    content: `${meaning}\n\n**What it does not mean:** ${notMeaning}`,
  },
});

const textBlock = (blockId, title, content) => ({
  blockType: 'defaultBlock',
  blockId,
  title: { fieldType: 'heading3', content: title },
  text: { fieldType: 'markdown', content },
});

export const trustPageData = {
  meta: {
    pageTitle: { fieldType: 'metaTitle', content: 'Trust & safety | American Neighbor' },
    pageDescription: {
      fieldType: 'metaDescription',
      content:
        'What each American Neighbor verification badge means, what it does not mean, and how to hire with good judgment.',
    },
  },
  sections: [
    {
      sectionType: 'article',
      sectionId: 'trust-intro',
      appearance: { fieldType: 'defaultAppearance' },
      title: { fieldType: 'heading1', content: 'Trust and safety' },
      description: {
        fieldType: 'paragraph',
        content:
          'American Neighbor is a marketplace. Providers are independent businesses who set their own prices and hours. Here is what we check, and what we do not.',
      },
      callToAction: { fieldType: 'none' },
      blocks: [],
    },
    {
      sectionType: 'columns',
      sectionId: 'badges',
      numColumns: 3,
      appearance: { fieldType: 'defaultAppearance' },
      title: { fieldType: 'heading2', content: 'What we check before a provider can list' },
      description: {
        fieldType: 'paragraph',
        content:
          'Every provider on American Neighbor has passed these three checks. We do not run background checks at this time.',
      },
      callToAction: { fieldType: 'none' },
      blocks: [
        badgeBlock(
          'badge-military-service',
          'Military service',
          'Our team reviewed proof of current or prior service in the U.S. Armed Forces.',
          'It does not confirm skills, licenses, criminal history or character of service.'
        ),
        badgeBlock(
          'badge-team-review',
          'Reviewed by our team',
          'We reviewed the provider\'s account before allowing them to post listings.',
          'It is not an inspection of their work or a guarantee of quality.'
        ),
        badgeBlock(
          'badge-stripe-payouts',
          'Payouts verified by Stripe',
          'The provider set up a payout account with our payment processor, Stripe, which verifies payout details.',
          'It is not a background check and does not confirm skills or licenses.'
        ),
      ],
    },
    {
      sectionType: 'columns',
      sectionId: 'good-to-know',
      numColumns: 2,
      appearance: { fieldType: 'defaultAppearance' },
      title: { fieldType: 'heading2', content: 'Good to know before you book' },
      callToAction: { fieldType: 'none' },
      blocks: [
        textBlock(
          'licensed-work',
          'Licensed work',
          'Some work needs a state license no matter who does it, such as electrical and plumbing. Providers are responsible for holding any license, permit and insurance their services require. Ask to see it before the job starts.'
        ),
        textBlock(
          'not-a-government-service',
          'Not a government service',
          'American Neighbor is a private business with no connection to, or endorsement from, the Department of Defense, any military branch or installation, or the Department of Veterans Affairs. Military service describes our community. It is not a guarantee of skill, honesty or safety, so read reviews and use good judgment. In an emergency, call 911.'
        ),
      ],
    },
    {
      sectionType: 'article',
      sectionId: 'trust-cta',
      appearance: { fieldType: 'defaultAppearance' },
      title: { fieldType: 'heading2', content: 'Ready to find help?' },
      description: {
        fieldType: 'paragraph',
        content: 'Browse providers in your area and see exactly which checks each one has passed.',
      },
      callToAction: {
        fieldType: 'internalButtonLink',
        href: '/s',
        content: 'Find a provider',
      },
      blocks: [],
    },
  ],
};
