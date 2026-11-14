import { parseBlockText, withCustomSections } from './landingSections';

const image = id => ({
  id,
  type: 'imageAsset',
  attributes: { variants: { square: { url: 'x' } } },
});
const imageBlock = id => ({
  blockId: id,
  media: { fieldType: 'image', alt: `Photo ${id}`, image: image(id) },
});
const textBlock = id => ({ blockId: id, title: { fieldType: 'heading3', content: id } });

const hero = { sectionType: 'article', sectionName: 'Marketplace introduction', blocks: [] };
const services = {
  sectionType: 'columns',
  sectionName: 'Browse services',
  blocks: [textBlock('a')],
};
const steps = { sectionType: 'columns', sectionName: 'How it works', blocks: [textBlock('b')] };
const checks = {
  sectionType: 'columns',
  sectionName: 'What verified means',
  blocks: [textBlock('c')],
};
const community = {
  sectionType: 'columns',
  sectionName: 'Our Community',
  blocks: [
    imageBlock('p1'),
    imageBlock('p2'),
    imageBlock('p3'),
    imageBlock('p4'),
    imageBlock('p5'),
  ],
};
const closing = {
  sectionType: 'columns',
  sectionName: 'Explore the American Neighbor Difference',
  blocks: [textBlock('d')],
};

describe('landingSections', () => {
  describe('withCustomSections', () => {
    const page = { sections: [hero, services, steps, checks, community, closing] };
    const types = withCustomSections(page).sections.map(s => s.sectionType);

    it('applies the custom designs by section name', () => {
      expect(types.slice(0, 5)).toEqual([
        'heroSplit',
        'serviceTiles',
        'steps',
        'checks',
        'communityRoles',
      ]);
    });

    it('turns the community section into icon cards (no repeated photos)', () => {
      const communitySection = withCustomSections(page).sections.find(
        s => s.sectionType === 'communityRoles'
      );
      expect(communitySection).toBeTruthy();
    });

    it('turns a section named "...mission" into the mission band (even without blocks)', () => {
      const mission = { sectionType: 'columns', sectionName: 'Our mission', blocks: [] };
      const result = withCustomSections({ sections: [hero, mission] });
      expect(result.sections[1].sectionType).toEqual('missionBand');
    });

    it('adds reviews, service area and FAQ before the closing section', () => {
      expect(types.slice(5)).toEqual(['reviewsInfo', 'serviceArea', 'faq', 'twoWays']);
    });

    it('turns the closing "Explore / two ways" section into the two-ways design', () => {
      const twoWays = withCustomSections(page).sections.find(s => s.sectionType === 'twoWays');
      expect(twoWays).toBeTruthy();
      expect(twoWays.sectionName).toEqual('Explore the American Neighbor Difference');
    });

    it('appends the coded sections when there is no closing section', () => {
      const result = withCustomSections({ sections: [hero, services] });
      expect(result.sections.map(s => s.sectionType)).toEqual([
        'heroSplit',
        'serviceTiles',
        'reviewsInfo',
        'serviceArea',
        'faq',
      ]);
    });

    it('keeps the Console design for a named section without blocks', () => {
      const result = withCustomSections({ sections: [hero, { ...services, blocks: [] }] });
      expect(result.sections[1].sectionType).toEqual('columns');
    });

    it('does not change the input or pages it should not touch', () => {
      expect(page.sections[0].sectionType).toEqual('article');
      const other = { sections: [services, hero] };
      expect(withCustomSections(other)).toBe(other);
      expect(withCustomSections(null)).toBe(null);
    });
  });

  describe('parseBlockText', () => {
    it('separates the description from the first link', () => {
      const parsed = parseBlockText(
        'Mowing, trimming, and **cleanup**.\n\n[Browse providers](/s?pub_categoryLevel1=yard)'
      );
      expect(parsed.text).toEqual('Mowing, trimming, and cleanup.');
      expect(parsed.link).toEqual({
        label: 'Browse providers',
        href: '/s?pub_categoryLevel1=yard',
      });
    });

    it('handles text without a link and missing text', () => {
      expect(parseBlockText('Just text.')).toEqual({ text: 'Just text.', link: null });
      expect(parseBlockText(undefined)).toEqual({ text: '', link: null });
    });
  });
});
