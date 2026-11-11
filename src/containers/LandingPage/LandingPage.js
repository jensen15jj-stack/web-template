import React from 'react';
import loadable from '@loadable/component';

import { bool, object } from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';

import { camelize } from '../../util/string';
import { propTypes } from '../../util/types';

import FallbackPage from './FallbackPage';
import SectionHeroSplit from './SectionHeroSplit';
import { ASSET_NAME } from './LandingPage.duck';
import { fetchFeaturedListings } from '../../ducks/featuredListings.duck';
import { getListingsById } from '../../ducks/marketplaceData.duck';
import { getFeaturedListingsProps } from '../../util/data';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

// American Neighbor: custom section components for the landing page.
const SECTION_COMPONENTS = {
  heroSplit: { component: SectionHeroSplit },
};

// The landing page content is still edited in Console.
// If the first section of the page uses the Hero or Article template,
// it is rendered with the custom split hero (title, description, call to action and
// background image are used; content blocks are not shown in the hero).
const HERO_SOURCE_TYPES = ['hero', 'article'];
export const withCustomSections = pageData => {
  const sections = pageData?.sections;
  if (!Array.isArray(sections) || sections.length === 0) {
    return pageData;
  }
  const [first, ...rest] = sections;
  if (!HERO_SOURCE_TYPES.includes(first?.sectionType)) {
    return pageData;
  }
  return { ...pageData, sections: [{ ...first, sectionType: 'heroSplit' }, ...rest] };
};

export const LandingPageComponent = props => {
  const { pageAssetsData, inProgress, error } = props;

  return (
    <PageBuilder
      pageAssetsData={withCustomSections(pageAssetsData?.[camelize(ASSET_NAME)]?.data)}
      options={{ sectionComponents: SECTION_COMPONENTS }}
      inProgress={inProgress}
      error={error}
      fallbackPage={<FallbackPage error={error} />}
      featuredListings={getFeaturedListingsProps(camelize(ASSET_NAME), props)}
    />
  );
};

LandingPageComponent.propTypes = {
  pageAssetsData: object,
  inProgress: bool,
  error: propTypes.error,
};

const mapStateToProps = state => {
  const { pageAssetsData, inProgress, error } = state.hostedAssets || {};
  const featuredListingData = state.featuredListings || {};

  const getListingEntitiesById = listingIds => getListingsById(state, listingIds);

  return { pageAssetsData, featuredListingData, getListingEntitiesById, inProgress, error };
};

const mapDispatchToProps = dispatch => ({
  onFetchFeaturedListings: (sectionId, parentPage, listingImageConfig, allSections) =>
    dispatch(fetchFeaturedListings({ sectionId, parentPage, listingImageConfig, allSections })),
});

// Note: it is important that the withRouter HOC is **outside** the
// connect HOC, otherwise React Router won't rerender any Route
// components since connect implements a shouldComponentUpdate
// lifecycle hook.
//
// See: https://github.com/ReactTraining/react-router/issues/4671
const LandingPage = compose(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(LandingPageComponent);

export default LandingPage;
