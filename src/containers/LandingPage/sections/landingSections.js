// American Neighbor: maps the landing page content (edited in Console) to custom section designs,
// and adds a few sections whose content lives in this codebase (translations).

const HERO_SOURCE_TYPES = ['hero', 'article'];

// Console sections are recognised by the section name the operator gives them in Console.
const NAMED_SECTION_TYPES = [
  [/browse services/i, 'serviceTiles'],
  [/how it works/i, 'steps'],
  [/verified/i, 'checks'],
];

// Sections that are not edited in Console. Their copy is in src/translations/en.json.
const CODED_SECTIONS = [
  { sectionType: 'reviewsInfo', sectionId: 'reviews' },
  { sectionType: 'serviceArea', sectionId: 'service-area' },
  { sectionType: 'faq', sectionId: 'faq' },
];

// The coded sections are placed before the closing call-to-action sections.
const CLOSING_SECTION_NAME = /explore|two ways|call to action/i;

const imageBlocks = section =>
  (section?.blocks || []).filter(
    block => block?.media?.fieldType === 'image' && block.media.image?.attributes?.variants
  );

/**
 * Pick photos for the hero collage: the first section that has at least three image blocks.
 *
 * @param {Array<Object>} sections landing page sections
 * @returns {Array<Object>} up to four { image, alt } objects
 */
export const pickHeroImages = sections => {
  const source = (sections || []).find(section => imageBlocks(section).length >= 3);
  return source
    ? imageBlocks(source)
        .slice(0, 4)
        .map(block => ({ image: block.media.image, alt: block.media.alt || '' }))
    : [];
};

const customTypeFor = section => {
  const match = NAMED_SECTION_TYPES.find(([pattern]) => pattern.test(section?.sectionName || ''));
  // Only sections that have content blocks can use the block-based designs.
  return match && section?.blocks?.length > 0 ? match[1] : section.sectionType;
};

/**
 * Apply the American Neighbor section designs to the landing page data.
 *
 * - The first section (Hero or Article template) uses the split hero.
 * - Sections named "Browse services", "How it works" and "...verified..." use custom designs.
 * - Reviews, service area and FAQ sections are added before the closing call-to-action sections.
 *
 * @param {Object} pageData landing page asset data ({ sections, meta })
 * @returns {Object} page data with custom section types
 */
export const withCustomSections = pageData => {
  const sections = pageData?.sections;
  if (!Array.isArray(sections) || sections.length === 0) {
    return pageData;
  }
  const [first, ...rest] = sections;
  if (!HERO_SOURCE_TYPES.includes(first?.sectionType)) {
    return pageData;
  }

  const hero = { ...first, sectionType: 'heroSplit', heroImages: pickHeroImages(rest) };
  const mapped = rest.map(section => ({ ...section, sectionType: customTypeFor(section) }));

  const closingIndex = mapped.findIndex(section =>
    CLOSING_SECTION_NAME.test(section?.sectionName || '')
  );
  const insertAt = closingIndex >= 0 ? closingIndex : mapped.length;
  const withCoded = [...mapped.slice(0, insertAt), ...CODED_SECTIONS, ...mapped.slice(insertAt)];

  return { ...pageData, sections: [hero, ...withCoded] };
};

/**
 * Split a block's Markdown text into plain description text and its first link.
 *
 * @param {string} markdown block text, e.g. "Mowing and cleanup.\n\n[Browse](/s?pub_x=yard)"
 * @returns {{ text: string, link: { label: string, href: string } | null }}
 */
export const parseBlockText = (markdown = '') => {
  const linkMatch = markdown.match(/\[([^\]]+)\]\(([^)\s]+)\)/);
  const text = markdown
    .replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, '')
    .replace(/[*_#>`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return { text, link: linkMatch ? { label: linkMatch[1], href: linkMatch[2] } : null };
};
