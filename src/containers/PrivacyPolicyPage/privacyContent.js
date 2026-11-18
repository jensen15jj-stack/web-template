// American Neighbor Privacy Policy, built into the app (not fetched from Console).
// Source of truth: the "American Neighbor Privacy Policy" Claude Doc. Update both together.

const privacyMarkdown = `
Last updated: November 17, 2026

## 1. Who we are

This policy explains what information AMERICAN NEIGHBOR LLC, a Florida limited liability company ("American Neighbor," "we"), collects when you use our marketplace, how we use it, and your choices. It covers our website and any related services.

We do not sell your personal information.

## 2. Information we collect

We collect what you give us, what is created when you use the platform, and limited technical data.

- **Account:** name, email, password, phone (optional), profile photo and bio. You provide these.
- **Provider profile:** branch of service and service status (for example "Air Force Veteran"), listings, prices, service area, availability and photos. You provide these.
- **Bookings:** dates, times, services booked, prices, service fee, cancellations and reviews. These are created when you use the platform.
- **Payments:** card details, payout bank account and the identity details Stripe requires. You enter these directly with Stripe.
- **Messages:** messages between users and with us.
- **Technical:** IP address, browser and device type, pages viewed and login cookies. These come from your browser.

Card numbers and bank details go straight to Stripe. We do not store full card or bank account numbers.

We do not show ranks, units or duty stations on the platform, and we do not ask for them.

## 3. Military verification

Providers must show proof of current or former military service before they can list services.

- **Today:** we verify visually. You show us proof, such as a DD-214 or VA card, during a live review with our team. We do not copy, photograph, record or store the documents you show us.
- **What we keep:** only the result. We record that you were verified, the date, and the branch and service status you chose to display.
- **Later:** we may use a third-party verification service. If we do, that service will collect what it needs under its own privacy policy, and send us only a verified or not-verified result. We will update this policy before that change.

## 4. How we use information

- Run the marketplace: accounts, listings, search, bookings, messaging and reviews.
- Process payments, service fees, refunds and Provider payouts.
- Verify Providers' military affiliation and keep the community safe.
- Send booking confirmations, reminders, receipts and account notices.
- Answer support requests and handle cancellations and disputes.
- Prevent fraud, enforce our Terms of Service and meet legal duties.
- Improve the platform using usage patterns.
- Send occasional updates about American Neighbor. Every marketing email includes our postal address and an unsubscribe link. You can unsubscribe anytime; account and booking emails will still be sent.

## 5. How we share information

We share information only as needed to run the platform:

- **With other users.** Your public profile, listings, reviews and branch and service status are visible to visitors. After a booking, the Customer and Provider see what they need to complete the job, such as name, messages and the service address.
- **With service providers** who run the platform for us: Sharetribe (marketplace software and data hosting), Stripe (payments and payouts), our website host, map and email providers. They may use your information only to provide their services to us.
- **For legal reasons.** To follow the law or a valid legal request, protect someone's safety, or enforce our Terms.
- **If the business changes hands.** In a merger, sale or similar event, information may transfer to the new owner under this policy.

We do not sell your personal information or share it for targeted advertising. We do not currently use advertising pixels or third-party analytics on the platform. If we add them, we will update this policy first and explain how to opt out.

## 6. Retention, security and your rights

**Retention.** We keep account information while your account is open. After you close it, we delete or anonymize it within a reasonable time, except records we must keep for taxes, payments, disputes or the law. Booking and payment records are typically kept for up to 7 years.

**Security.** We use reasonable safeguards, and our payment and hosting partners use industry-standard security. No system is perfectly secure, so please use a strong, unique password.

**Your choices.**

- View and update most of your information in your account settings.
- Ask us for a copy of your information, or ask us to correct or delete it.
- Unsubscribe from marketing emails using the link in any of them.
- Close your account at any time.

Depending on where you live, you may have more rights under state law. We will honor them. We respond within the time applicable law requires.

**Age.** American Neighbor is for people 18 and older. We do not knowingly collect information from anyone under 18.

**Changes.** We will post updates here with a new date, and notify active users of material changes.

**Contact.** AMERICAN NEIGHBOR LLC · americanneighbormail@gmail.com
`;

// Page asset format used by PageBuilder / SectionBuilder.
export const privacyPageData = {
  sections: [
    {
      sectionType: 'article',
      sectionId: 'privacy',
      appearance: { fieldType: 'customAppearance', backgroundColor: '#ffffff' },
      title: { fieldType: 'heading1', content: 'Privacy Policy' },
      blocks: [
        {
          blockType: 'defaultBlock',
          blockId: 'privacy-content',
          text: { fieldType: 'markdown', content: privacyMarkdown },
        },
      ],
    },
  ],
  meta: {
    pageTitle: { fieldType: 'metaTitle', content: 'Privacy Policy | American Neighbor' },
    pageDescription: {
      fieldType: 'metaDescription',
      content: 'How American Neighbor collects, uses and protects your information.',
    },
  },
};
