import aboutPhoto from '../LandingPage/sections/images/about-community.jpg';
// Content for the About page. Rendered with the shared custom section designs.

const card = (blockId, icon, title, text) => ({
  blockType: 'defaultBlock',
  blockId,
  icon,
  title: { fieldType: 'heading3', content: title },
  text: { fieldType: 'markdown', content: text },
});

export const aboutPageData = {
  meta: {
    pageTitle: { fieldType: 'metaTitle', content: 'About us | American Neighbor' },
    pageDescription: {
      fieldType: 'metaDescription',
      content:
        'American Neighbor connects the military community with the neighbors around them — one verified, trusted provider at a time.',
    },
  },
  sections: [
    {
      sectionType: 'pageHero',
      sectionId: 'about-hero',
      imageSrc: aboutPhoto,
      imageAlt: 'Neighbors and military families greeting each other on a front walk',
      tone: 'tinted',
      eyebrowText: 'About us',
      titleText: 'Who we are',
      descriptionText:
        'American Neighbor is an online marketplace that connects military members — serving or retired — with neighbors who need help with everyday tasks, skilled trades, and professional services.',
    },
    {
      sectionType: 'iconCards',
      sectionId: 'about-values',
      tone: 'white',
      title: { fieldType: 'heading2', content: 'What we stand for' },
      blocks: [
        card(
          'mission',
          'shield',
          'Our mission',
          'Give neighbors the confidence of knowing exactly who they are inviting into their homes and businesses, by building a verified military workforce they can trust.'
        ),
        card(
          'tribute',
          'medal',
          'A tribute to those who serve',
          'We are dedicated to the active-duty service members, veterans, and military families who bring discipline, experience, and integrity to everyday work.'
        ),
        card(
          'community',
          'home',
          'A two-sided community',
          'Neighbors who need trusted help on one side; service members, veterans, and families providing for their own on the other. We connect the two — starting around installations, then anywhere in the country.'
        ),
      ],
    },
    {
      sectionType: 'pageHero',
      sectionId: 'about-cta',
      headingLevel: 2,
      tone: 'navy',
      titleText: 'Join the community',
      descriptionText: 'Hire a verified neighbor, or put your own skills to work.',
      ctaHref: '/s',
      ctaLabel: 'Find a provider',
      secondaryHref: '/p/becomeaprovider',
      secondaryLabel: 'Become a provider',
    },
  ],
};
