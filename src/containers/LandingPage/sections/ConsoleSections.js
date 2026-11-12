import React from 'react';
import classNames from 'classnames';

import { FormattedMessage } from '../../../util/reactIntl';

import Field from '../../PageBuilder/Field';
import { pickFieldOptions } from '../../PageBuilder/PageBuilder.helpers';
import { Link } from '../../PageBuilder/Primitives/Link';

import { Icon, iconNameForTitle } from './icons';
import { parseBlockText } from './landingSections';

import css from './sections.module.css';

const SectionHeader = props => {
  const { eyebrowId, title, description, options } = props;
  const fieldOptions = pickFieldOptions(options);
  return (
    <header className={css.header}>
      {eyebrowId ? (
        <p className={css.eyebrow}>
          <FormattedMessage id={eyebrowId} />
        </p>
      ) : null}
      <Field data={title} className={css.title} options={fieldOptions} />
      <Field data={description} className={css.description} options={fieldOptions} />
    </header>
  );
};

/**
 * "Browse services": each Console block becomes a tile with an icon.
 * The whole tile links to the first link found in the block's text.
 *
 * @component
 * @param {Object} props section data from Console (title, description, blocks)
 * @returns {JSX.Element} section with service tiles
 */
export const SectionServiceTiles = props => {
  const { sectionId, title, description, blocks = [], options } = props;
  return (
    <section id={sectionId} className={classNames(css.section, css.sectionTinted)}>
      <div className={css.inner}>
        <SectionHeader
          eyebrowId="LandingSections.servicesEyebrow"
          title={title}
          description={description}
          options={options}
        />
        <ul className={css.tileGrid}>
          {blocks.map(block => {
            const tileTitle = block.title?.content || '';
            const { text, link } = parseBlockText(block.text?.content);
            const content = (
              <>
                <span className={css.tileIcon}>
                  <Icon name={iconNameForTitle(tileTitle, 'wrench')} size={26} />
                </span>
                <span className={css.tileTitle}>{tileTitle}</span>
                {text ? <span className={css.tileText}>{text}</span> : null}
                {link ? (
                  <span className={css.tileLinkLabel}>
                    {link.label}
                    <Icon name="arrow" size={16} />
                  </span>
                ) : null}
              </>
            );
            return (
              <li key={block.blockId || tileTitle} className={css.tileItem}>
                {link ? (
                  <Link href={link.href} rootClassName={css.tile}>
                    {content}
                  </Link>
                ) : (
                  <div className={css.tile}>{content}</div>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

/**
 * "How it works": each Console block becomes a numbered step.
 *
 * @component
 * @param {Object} props section data from Console (title, description, blocks)
 * @returns {JSX.Element} section with numbered steps
 */
export const SectionSteps = props => {
  const { sectionId, title, description, blocks = [], options } = props;
  return (
    <section id={sectionId} className={css.section}>
      <div className={css.inner}>
        <SectionHeader
          eyebrowId="LandingSections.stepsEyebrow"
          title={title}
          description={description}
          options={options}
        />
        <ol className={css.stepList}>
          {blocks.map((block, index) => {
            // Console titles may already start with a number ("1. Search"); the design adds its own.
            const stepTitle = (block.title?.content || '').replace(/^\s*\d+[.)]\s*/, '');
            const { text } = parseBlockText(block.text?.content);
            return (
              <li key={block.blockId || stepTitle} className={css.step}>
                <span className={css.stepNumber} aria-hidden="true">
                  {index + 1}
                </span>
                <h3 className={css.stepTitle}>{stepTitle}</h3>
                {text ? <p className={css.stepText}>{text}</p> : null}
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
};

/**
 * "What verified means": each Console block becomes a check with an icon,
 * followed by a link to the Trust and safety page.
 *
 * @component
 * @param {Object} props section data from Console (title, description, blocks)
 * @returns {JSX.Element} section with verification checks
 */
export const SectionChecks = props => {
  const { sectionId, title, description, blocks = [], options } = props;
  return (
    <section id={sectionId} className={classNames(css.section, css.sectionTinted)}>
      <div className={css.inner}>
        <SectionHeader
          eyebrowId="LandingSections.checksEyebrow"
          title={title}
          description={description}
          options={options}
        />
        <ul className={css.checkGrid}>
          {blocks.map(block => {
            const checkTitle = block.title?.content || '';
            const { text } = parseBlockText(block.text?.content);
            return (
              <li key={block.blockId || checkTitle} className={css.check}>
                <span className={css.checkIcon}>
                  <Icon name={iconNameForTitle(checkTitle, 'shield')} size={24} />
                </span>
                <h3 className={css.checkTitle}>{checkTitle}</h3>
                {text ? <p className={css.checkText}>{text}</p> : null}
              </li>
            );
          })}
        </ul>
        <div className={css.centered}>
          <Link href="/trust-and-safety" rootClassName={css.outlineButton}>
            <FormattedMessage id="LandingSections.checksLink" />
          </Link>
        </div>
      </div>
    </section>
  );
};
