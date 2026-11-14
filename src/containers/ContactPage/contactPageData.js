// Content for the Contact page. The contact form itself is a custom section
// (contactForm) defined in code.

export const contactPageData = {
  meta: {
    pageTitle: { fieldType: 'metaTitle', content: 'Contact us | American Neighbor' },
    pageDescription: {
      fieldType: 'metaDescription',
      content:
        'Questions about hiring, becoming a provider, or how verification works? Get in touch with American Neighbor.',
    },
  },
  sections: [
    {
      sectionType: 'pageHero',
      sectionId: 'contact-hero',
      tone: 'tinted',
      eyebrowText: 'Contact',
      titleText: "We're here to help",
      descriptionText:
        'Questions about hiring, becoming a provider, or how verification works? Send us a note and we will get back to you.',
    },
    {
      sectionType: 'contactForm',
      sectionId: 'contact-form',
    },
  ],
};
