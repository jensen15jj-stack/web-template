import React from 'react';

// Small line icons used by the landing page sections.
// All icons are decorative: the text next to them carries the meaning.
const Svg = ({ size = 24, children, ...rest }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    {...rest}
  >
    {children}
  </svg>
);

const paths = {
  sofa: (
    <>
      <path d="M5 11V8a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3" />
      <path d="M3 13a2 2 0 0 1 4 0v2h10v-2a2 2 0 0 1 4 0v4H3Z" />
      <path d="M6 17v2M18 17v2" />
    </>
  ),
  truck: (
    <>
      <path d="M3 7h11v9H3Z" />
      <path d="M14 10h4l3 3v3h-7Z" />
      <circle cx="7" cy="17.5" r="1.5" />
      <circle cx="17.5" cy="17.5" r="1.5" />
    </>
  ),
  screen: (
    <>
      <path d="M4 5h16v11H4Z" />
      <path d="M9 20h6M12 16v4" />
    </>
  ),
  leaf: (
    <>
      <path d="M5 19c0-8 5-13 14-14 0 9-5 14-13 14" />
      <path d="M5 19 13 11" />
    </>
  ),
  wrench: (
    <path d="M14.5 6.5a4 4 0 0 0-5.4 5.1L3.5 17.2l3.3 3.3 5.6-5.6a4 4 0 0 0 5.1-5.4l-2.6 2.6-2.4-.6-.6-2.4Z" />
  ),
  sparkles: (
    <>
      <path d="M11 4l1.6 4.4L17 10l-4.4 1.6L11 16l-1.6-4.4L5 10l4.4-1.6Z" />
      <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8Z" />
    </>
  ),
  hardhat: (
    <>
      <path d="M3 17h18" />
      <path d="M5.5 17v-3a6.5 6.5 0 0 1 13 0v3" />
      <path d="M10 8v4M14 8v4" />
    </>
  ),
  briefcase: (
    <>
      <path d="M3.5 7.5h17v12h-17Z" />
      <path d="M9 7.5v-2h6v2" />
      <path d="M3.5 13h17" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.5 3 8 7.5 9.5 4.5-1.5 7.5-5 7.5-9.5V6Z" />
      <path d="m9 12 2.2 2.2 4-4.2" />
    </>
  ),
  idcard: (
    <>
      <rect x="3" y="5.5" width="18" height="13" rx="1.8" />
      <circle cx="8.5" cy="11" r="2" />
      <path d="M5.5 15.5c.6-1.4 1.7-2 3-2s2.4.6 3 2" />
      <path d="M14.5 10h4M14.5 13.5h4" />
    </>
  ),
  filecheck: (
    <>
      <path d="M7 3.5h7.5L18 7v13.5H7Z" />
      <path d="M14 3.5V7.5h4" />
      <path d="m9.8 14 1.7 1.7 3.2-3.4" />
    </>
  ),
  heart: <path d="M12 20s-7-4.4-7-9.5A4 4 0 0 1 12 8a4 4 0 0 1 7 2.5C19 15.6 12 20 12 20Z" />,
  star: <path d="m12 4 2.4 5 5.4.7-4 3.8 1 5.5-4.8-2.7L7.2 19l1-5.5-4-3.8 5.4-.7Z" />,
  pin: (
    <>
      <path d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z" />
      <circle cx="12" cy="10" r="2.5" />
    </>
  ),
  arrow: <path d="M5 12h14m-6-6 6 6-6 6" />,
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  chevron: <path d="m6 9 6 6 6-6" />,
};

/**
 * @param {Object} props
 * @param {string} props.name one of the icon names above
 * @param {number?} props.size width and height in px
 */
export const Icon = ({ name, size, ...rest }) => (
  <Svg size={size} {...rest}>
    {paths[name] || paths.check}
  </Svg>
);

// Pick an icon from words in a title, e.g. a service category or a verification check.
const KEYWORD_ICONS = [
  [/furniture|assembly/i, 'sofa'],
  [/mov|pack|haul/i, 'truck'],
  [/mount|install|tv/i, 'screen'],
  [/yard|lawn|landscap|garden/i, 'leaf'],
  [/repair|handyman|fix/i, 'wrench'],
  [/clean/i, 'sparkles'],
  [/trade|electric|plumb|construction/i, 'hardhat'],
  [/professional|business|tutor|consult/i, 'briefcase'],
  [/identity|\bid\b/i, 'idcard'],
  [/licen|background|document/i, 'filecheck'],
  [/family|spouse/i, 'heart'],
  [/military|service|affiliation|veteran/i, 'shield'],
];

export const iconNameForTitle = (title = '', fallback = 'check') => {
  const match = KEYWORD_ICONS.find(([pattern]) => pattern.test(title));
  return match ? match[1] : fallback;
};
