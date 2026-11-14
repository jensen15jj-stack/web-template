// American Neighbor: the shared map of custom section components, used by the
// landing page and the sub-pages (About, Find a provider, Become a provider, Contact).

import SectionHeroSplit from '../SectionHeroSplit';
import {
  SectionServiceTiles,
  SectionSteps,
  SectionChecks,
  SectionCommunityRoles,
  SectionMissionBand,
  SectionPageHero,
  SectionIconCards,
  SectionTwoWays,
} from './ConsoleSections';
import { SectionReviewsInfo, SectionServiceArea, SectionFaq } from './CodedSections';
import SectionContactForm from './SectionContactForm';

export const CUSTOM_SECTION_COMPONENTS = {
  heroSplit: { component: SectionHeroSplit },
  pageHero: { component: SectionPageHero },
  serviceTiles: { component: SectionServiceTiles },
  steps: { component: SectionSteps },
  checks: { component: SectionChecks },
  communityRoles: { component: SectionCommunityRoles },
  missionBand: { component: SectionMissionBand },
  iconCards: { component: SectionIconCards },
  twoWays: { component: SectionTwoWays },
  reviewsInfo: { component: SectionReviewsInfo },
  serviceArea: { component: SectionServiceArea },
  faq: { component: SectionFaq },
  contactForm: { component: SectionContactForm },
};
