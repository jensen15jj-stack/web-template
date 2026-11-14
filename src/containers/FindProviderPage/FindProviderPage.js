import React from 'react';

import { SectionsPage } from '../LandingPage/sections/SectionsPage';

import { findProviderPageData } from './findProviderPageData';

/**
 * Find a Provider page, built from in-code section data.
 *
 * @component
 * @returns {JSX.Element} Find a Provider page
 */
const FindProviderPage = () => (
  <SectionsPage pageData={findProviderPageData} currentPage="FindProviderPage" />
);

export default FindProviderPage;
