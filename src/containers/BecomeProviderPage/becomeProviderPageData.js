// Content for the Become a Provider page.

const card = (blockId, icon, title, text) => ({
  blockType: 'defaultBlock',
  blockId,
  icon,
  title: { fieldType: 'heading3', content: title },
  text: { fieldType: 'markdown', content: text },
});

const step = (blockId, title, text) => ({
  blockType: 'defaultBlock',
  blockId,
  title: { fieldType: 'heading3', content: title },
  text: { fieldType: 'markdown', content: text },
});

export const becomeProviderPageData = {
  meta: {
    pageTitle: { fieldType: 'metaTitle', content: 'Become a provider | American Neighbor' },
    pageDescription: {
      fieldType: 'metaDescription',
      content:
        'Turn your skills into a business. List your services on American Neighbor and earn a sustainable income.',
    },
  },
  sections: [
    {
      sectionType: 'pageHero',
      sectionId: 'become-hero',
      tone: 'navy',
      eyebrowText: 'For service members, veterans, and military family',
      titleText: 'Build a business, not just a skill',
      descriptionText:
        'Turn your skills into a business and earn a sustainable income as an American Neighbor. List your services, set your own prices and hours, and get paid through the platform.',
      ctaHref: '/signup',
      ctaLabel: 'Start your application',
      secondaryHref: '/trust-and-safety',
      secondaryLabel: 'How verification works',
    },
    {
      sectionType: 'iconCards',
      sectionId: 'become-why',
      tone: 'tinted',
      title: { fieldType: 'heading2', content: 'Why American Neighbor' },
      blocks: [
        card(
          'earn',
          'briefcase',
          'Earn on your schedule',
          'Pick up work that fits around your duty hours and family time, and turn your skills into real income for the ones you provide for.'
        ),
        card(
          'credential',
          'shield',
          'Your service is your credential',
          "You've already been vetted, trusted, and proven under pressure. That background sets you apart the moment a neighbor sees your profile."
        ),
        card(
          'yours',
          'home',
          "Build something that's yours",
          'Grow a reputation, a customer base, and a business you own — starting with the very next task.'
        ),
      ],
    },
    {
      sectionType: 'steps',
      sectionId: 'become-path',
      title: { fieldType: 'heading2', content: 'Your path to joining' },
      description: {
        fieldType: 'paragraph',
        content: 'Four steps from sign-up to your first job.',
      },
      blocks: [
        step(
          'verify',
          'Verification',
          'We confirm your military background and that every provider meets our standards of integrity and professionalism.'
        ),
        step(
          'profile',
          'Build your profile',
          'Show your skills, experience, and availability so neighbors can quickly see how you can help.'
        ),
        step(
          'work',
          'Get the work done',
          'Connect with community members, complete tasks, and build your reputation through trusted service.'
        ),
        step(
          'earn',
          'Earn and grow',
          'Start earning income and grow a business that is yours, backed by a community that values service.'
        ),
      ],
    },
    {
      sectionType: 'iconCards',
      sectionId: 'become-activeduty',
      tone: 'tinted',
      blocks: [
        card(
          'activeduty',
          'shield',
          'Serving on active duty?',
          'Most service members need written approval from their chain of command before taking off-duty work. Check with your supervisor or legal office before you list your services.'
        ),
      ],
    },
    {
      sectionType: 'iconCards',
      sectionId: 'become-learn',
      tone: 'white',
      title: { fieldType: 'heading2', content: "What you'll build" },
      blocks: [
        card(
          'foundations',
          'briefcase',
          'Business foundations',
          'Learn the basics of a business structure centered on the skills you have mastered.'
        ),
        card(
          'strategy',
          'screen',
          'Market strategy',
          'Develop a roadmap for your services, focused on local needs and what actually brings in work.'
        ),
        card(
          'customers',
          'heart',
          'Customer management',
          'Master communication and service excellence to build long-term trust with your community.'
        ),
      ],
    },
    {
      sectionType: 'pageHero',
      sectionId: 'become-cta',
      headingLevel: 2,
      tone: 'navy',
      titleText: 'Ready to put your skills to work?',
      descriptionText: 'Create your account and start your provider application.',
      ctaHref: '/signup',
      ctaLabel: 'Start your application',
    },
  ],
};
