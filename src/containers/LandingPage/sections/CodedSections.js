import React from 'react';
import classNames from 'classnames';

import { FormattedMessage, useIntl } from '../../../util/reactIntl';

import { Link } from '../../PageBuilder/Primitives/Link';

import { Icon } from './icons';

import css from './sections.module.css';

const REVIEW_POINTS = ['realBookings', 'bothSides', 'onProfiles'];
const REVIEW_POINT_ICONS = { realBookings: 'check', bothSides: 'heart', onProfiles: 'idcard' };
const FAQ_KEYS = ['providers', 'verification', 'payment', 'government', 'area', 'becomeProvider'];
const STARS = [1, 2, 3, 4, 5];

/**
 * Explains how reviews work on the marketplace.
 * It deliberately shows no testimonials: real reviews appear on provider profiles and listings
 * once customers have completed bookings.
 *
 * @component
 * @param {Object} props
 * @param {string} props.sectionId id of the section
 * @returns {JSX.Element} reviews information section
 */
export const SectionReviewsInfo = props => {
  const { sectionId } = props;
  return (
    <section id={sectionId} className={css.section}>
      <div className={css.inner}>
        <header className={css.header}>
          <p className={css.stars} aria-hidden="true">
            {STARS.map(star => (
              <Icon key={star} name="star" size={22} className={css.star} />
            ))}
          </p>
          <h2 className={css.titleStatic}>
            <FormattedMessage id="LandingSections.reviewsTitle" />
          </h2>
          <p className={css.descriptionStatic}>
            <FormattedMessage id="LandingSections.reviewsDescription" />
          </p>
        </header>
        <ul className={css.checkGrid}>
          {REVIEW_POINTS.map(point => (
            <li key={point} className={css.check}>
              <span className={classNames(css.checkIcon, css.checkIconGold)}>
                <Icon name={REVIEW_POINT_ICONS[point]} size={24} />
              </span>
              <h3 className={css.checkTitle}>
                <FormattedMessage id={`LandingSections.reviews.${point}.title`} />
              </h3>
              <p className={css.checkText}>
                <FormattedMessage id={`LandingSections.reviews.${point}.text`} />
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/**
 * Shows where the marketplace operates, as a list of town chips.
 * Towns come from one comma-separated translation string so they can be edited in Console.
 *
 * @component
 * @param {Object} props
 * @param {string} props.sectionId id of the section
 * @returns {JSX.Element} service area section
 */
export const SectionServiceArea = props => {
  const { sectionId } = props;
  const intl = useIntl();
  const towns = intl
    .formatMessage({ id: 'LandingSections.areaTowns' })
    .split(',')
    .map(town => town.trim())
    .filter(Boolean);

  return (
    <section id={sectionId} className={classNames(css.section, css.sectionNavy)}>
      <div className={classNames(css.inner, css.areaLayout)}>
        <div className={css.areaCopy}>
          <p className={classNames(css.eyebrow, css.eyebrowOnNavy)}>
            <Icon name="pin" size={14} />
            <FormattedMessage id="LandingSections.areaEyebrow" />
          </p>
          <h2 className={classNames(css.titleStatic, css.onNavy)}>
            <FormattedMessage id="LandingSections.areaTitle" />
          </h2>
          <p className={classNames(css.descriptionStatic, css.onNavyMuted)}>
            <FormattedMessage id="LandingSections.areaDescription" />
          </p>
        </div>
        <ul className={css.townList}>
          {towns.map(town => (
            <li key={town} className={css.town}>
              {town}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

/**
 * Frequently asked questions, as native disclosure widgets (keyboard accessible, no script).
 *
 * @component
 * @param {Object} props
 * @param {string} props.sectionId id of the section
 * @returns {JSX.Element} FAQ section
 */
export const SectionFaq = props => {
  const { sectionId } = props;
  return (
    <section id={sectionId} className={classNames(css.section, css.sectionTinted)}>
      <div className={classNames(css.inner, css.innerNarrow)}>
        <header className={css.header}>
          <p className={css.eyebrow}>
            <FormattedMessage id="LandingSections.faqEyebrow" />
          </p>
          <h2 className={css.titleStatic}>
            <FormattedMessage id="LandingSections.faqTitle" />
          </h2>
        </header>
        <div className={css.faqList}>
          {FAQ_KEYS.map(key => (
            <details key={key} className={css.faqItem}>
              <summary className={css.faqQuestion}>
                <FormattedMessage id={`LandingSections.faq.${key}.question`} />
                <Icon name="chevron" size={20} className={css.faqChevron} />
              </summary>
              <p className={css.faqAnswer}>
                <FormattedMessage id={`LandingSections.faq.${key}.answer`} />
              </p>
            </details>
          ))}
        </div>
        <div className={css.centered}>
          <Link href="/trust-and-safety" rootClassName={css.outlineButton}>
            <FormattedMessage id="LandingSections.faqLink" />
          </Link>
        </div>
      </div>
    </section>
  );
};
