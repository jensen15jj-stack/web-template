import React from 'react';

import { SectionsPage } from '../LandingPage/sections/SectionsPage';

import { aboutPageData } from './aboutPageData';

/**
 * About page, built from in-code section data.
 *
 * @component
 * @returns {JSX.Element} About page
 */
const AboutPage = () => <SectionsPage pageData={aboutPageData} currentPage="AboutPage" />;

export default AboutPage;
