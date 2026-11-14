// American Neighbor: maps the landing page content (edited in Console) to custom section designs,
// and adds a few sections whose content lives in this codebase (translations).

const HERO_SOURCE_TYPES = ['hero', 'article'];

// Console sections are recognised by the section name the operator gives them in Console.
// `needsBlocks` sections render their Console content blocks, so they only use the custom
// design when the section actually has blocks.
const NAMED_SECTION_TYPES = [
  { pattern: /browse services/i, type: 'serviceTiles', needsBlocks: true },
  { pattern: /how it works/i, type: 'steps', needsBlocks: true },
  { pattern: /verified/i, type: 'checks', needsBlocks: true },
  { pattern: /community/i, type: 'communityRoles', needsBlocks: true },
  { pattern: /mission/i, type: 'missionBand', needsBlocks: false },
];

// Sections that are not edited in Console. Their copy is in src/translations/en.json.
const CODED_SECTIONS = [
  { sectionType: 'reviewsInfo', sectionId: 'reviews' },
  { sectionType: 'serviceArea', sectionId: 'service-area' },
  { sectionType: 'faq', sectionId: 'faq' },
];

// The coded sections are placed before the closing call-to-action sections.
const CLOSING_SECTION_NAME = /explore|two ways/i;

// Sections hidden on the landing page. The navy "Served? Put your skills to work."
// band is dropped because the "Two ways" section already offers the provider path.
const HIDDEN_SECTION_NAME = /provider call to action band/i;

const customTypeFor = section => {
  const match = NAMED_SECTION_TYPES.find(m => m.pattern.test(section?.sectionName || ''));
  if (!match) {
    return section.sectionType;
  }
  if (match.needsBlocks && !(section?.blocks?.length > 0)) {
    return section.sectionType;
  }
  return match.type;
};

/**
 * Apply the American Neighbor section designs to the landing page data.
 *
 * - The first section (Hero or Article template) uses the split hero.
 * - Sections are matched to custom designs by their Console section name
 *   (see NAMED_SECTION_TYPES).
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

  const hero = { ...first, sectionType: 'heroSplit' };
  const visible = rest.filter(section => !HIDDEN_SECTION_NAME.test(section?.sectionName || ''));
  const mapped = visible.map(section => ({ ...section, sectionType: customTypeFor(section) }));

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
