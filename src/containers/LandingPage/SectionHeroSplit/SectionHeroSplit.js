import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';
import { NamedLink, ResponsiveImage } from '../../../components';

import Field from '../../PageBuilder/Field';
import { pickFieldOptions } from '../../PageBuilder/PageBuilder.helpers';

import css from './SectionHeroSplit.module.css';

// The verification checks shown on the hero card.
// Only list checks that American Neighbor actually performs.
// Labels live in src/translations/en.json (SectionHeroSplit.check.*).
const VERIFICATION_CHECKS = ['identity', 'military', 'family', 'background'];

const IconPin = () => (
  <svg className={css.eyebrowIcon} width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M12 21s-7-6.1-7-11a7 7 0 0 1 14 0c0 4.9-7 11-7 11Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <circle cx="12" cy="10" r="2.5" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const IconCheck = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="m5 12.5 4.5 4.5L19 7.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const IconArrow = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" aria-hidden="true">
    <path
      d="M5 12h14m-6-6 6 6-6 6"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

/**
 * American Neighbor landing page hero.
 *
 * Text and search on the left, a photo with a verification card on the right.
 * Content still comes from Console: the first section of the landing page supplies
 * the title, description, call to action (search) and background image (used as the photo).
 *
 * @component
 * @param {Object} props
 * @param {string} props.sectionId id of the section
 * @param {Object?} props.title
 * @param {Object?} props.description
 * @param {Object?} props.appearance
 * @param {Object?} props.callToAction
 * @param {Object} props.options extra options for the section component
 * @returns {JSX.Element} hero section for the landing page
 */
const SectionHeroSplit = props => {
  const { sectionId, rootClassName, title, description, appearance, callToAction, options } = props;

  const fieldOptions = pickFieldOptions(options);
  const image = appearance?.backgroundImage;
  const variants = image?.attributes?.variants ? Object.keys(image.attributes.variants) : [];
  const hasImage = variants.length > 0;
  const fetchPriority = options?.fetchPriority;

  return (
    <section id={sectionId} className={classNames(rootClassName || css.root)}>
      <div className={css.content}>
        <div className={css.copy}>
          <p className={css.eyebrow}>
            <IconPin />
            <FormattedMessage id="SectionHeroSplit.eyebrow" />
          </p>
          <Field data={title} className={css.title} options={fieldOptions} />
          <Field data={description} className={css.description} options={fieldOptions} />
          <div className={css.search}>
            <Field data={callToAction} className={css.ctaButton} options={fieldOptions} />
          </div>
          <div className={css.actions}>
            <NamedLink
              name="CMSPage"
              params={{ pageId: 'becomeaprovider' }}
              className={css.secondaryButton}
            >
              <FormattedMessage id="SectionHeroSplit.becomeProvider" />
            </NamedLink>
            <NamedLink name="TrustPage" className={css.textLink}>
              <FormattedMessage id="SectionHeroSplit.howVerificationWorks" />
              <IconArrow />
            </NamedLink>
          </div>
        </div>

        <div className={css.visual}>
          <div className={css.photoFrame}>
            {hasImage ? (
              <ResponsiveImage
                className={css.photo}
                alt=""
                image={image}
                variants={variants}
                sizes="(max-width: 1023px) 100vw, 480px"
                {...(fetchPriority ? { fetchpriority: fetchPriority } : {})}
              />
            ) : null}
          </div>
          <div className={css.checksCard}>
            <p className={css.checksTitle}>
              <FormattedMessage id="SectionHeroSplit.checksTitle" />
            </p>
            <ul className={css.checksList}>
              {VERIFICATION_CHECKS.map(check => (
                <li key={check} className={classNames(css.badge, css[`badge_${check}`])}>
                  <IconCheck />
                  <FormattedMessage id={`SectionHeroSplit.check.${check}`} />
                </li>
              ))}
            </ul>
            <p className={css.checksNote}>
              <FormattedMessage id="SectionHeroSplit.checksNote" />
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SectionHeroSplit;
