import React from 'react';
import loadable from '@loadable/component';

import { trustPageData } from './trustPageData';

const PageBuilder = loadable(() =>
  import(/* webpackChunkName: "PageBuilder" */ '../PageBuilder/PageBuilder')
);

/**
 * Trust & safety page: explains what each verification badge means and does not mean.
 * The content lives in trustPageData.js and is rendered with the PageBuilder,
 * so it shares the look of the pages edited in Console.
 *
 * @component
 * @returns {JSX.Element} Trust & safety page
 */
const TrustPage = () => {
  return <PageBuilder pageAssetsData={trustPageData} inProgress={false} currentPage="TrustPage" />;
};

export default TrustPage;
