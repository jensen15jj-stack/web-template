import React from 'react';
import loadable from '@loadable/component';

import { CUSTOM_SECTION_COMPONENTS } from './customSections';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../../PageBuilder/PageBuilder')
);

/**
 * Renders a page from in-code section data using the American Neighbor custom
 * section designs. Used by the sub-pages that are built in code rather than
 * edited in Console (About, Find a provider, Become a provider, Contact).
 *
 * @component
 * @param {Object} props
 * @param {Object} props.pageData page asset data ({ sections, meta })
 * @param {string} props.currentPage route name for the top bar
 * @returns {JSX.Element} page built from the given section data
 */
export const SectionsPage = ({ pageData, currentPage }) => (
  <PageBuilder
    pageAssetsData={pageData}
    options={{ sectionComponents: CUSTOM_SECTION_COMPONENTS }}
    inProgress={false}
    currentPage={currentPage}
  />
);
