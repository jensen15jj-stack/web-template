import React from 'react';

import { SectionsPage } from '../LandingPage/sections/SectionsPage';

import { becomeProviderPageData } from './becomeProviderPageData';

/**
 * Become a Provider page, built from in-code section data.
 *
 * @component
 * @returns {JSX.Element} Become a Provider page
 */
const BecomeProviderPage = () => (
  <SectionsPage pageData={becomeProviderPageData} currentPage="BecomeProviderPage" />
);

export default BecomeProviderPage;
