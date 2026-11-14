import React from 'react';

import { SectionsPage } from '../LandingPage/sections/SectionsPage';

import { contactPageData } from './contactPageData';

/**
 * Contact page, built from in-code section data.
 *
 * @component
 * @returns {JSX.Element} Contact page
 */
const ContactPage = () => <SectionsPage pageData={contactPageData} currentPage="ContactPage" />;

export default ContactPage;
