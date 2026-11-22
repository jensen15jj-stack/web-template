import React, { useState } from 'react';

import { Icon } from './icons';

import css from './sections.module.css';

// American Neighbor's public contact details.
const CONTACT_EMAIL = 'hello@americanneighbor.us';
const INSTAGRAM_URL = 'https://www.instagram.com/american.neighbor/';
const INSTAGRAM_HANDLE = '@american.neighbor';

/**
 * Contact section: a message form plus direct contact methods.
 *
 * The form composes an email to American Neighbor using the visitor's own mail
 * app (mailto), so it works without any backend. The direct email and Instagram
 * links are always available as a fallback.
 *
 * @component
 * @param {Object} props
 * @param {string} props.sectionId id of the section
 * @returns {JSX.Element} contact section
 */
const SectionContactForm = props => {
  const { sectionId } = props;
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = event => {
    event.preventDefault();
    const subject = `Message from ${name || 'a neighbor'} via American Neighbor`;
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
    if (typeof window !== 'undefined') {
      window.location.href = mailto;
    }
  };

  return (
    <section id={sectionId} className={css.section}>
      <div className={css.inner}>
        <div className={css.contactLayout}>
          <form className={css.contactForm} onSubmit={handleSubmit}>
            <div className={css.field}>
              <label className={css.fieldLabel} htmlFor="contact-name">
                Your name
              </label>
              <input
                id="contact-name"
                className={css.fieldInput}
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                autoComplete="name"
                required
              />
            </div>
            <div className={css.field}>
              <label className={css.fieldLabel} htmlFor="contact-email">
                Your email
              </label>
              <input
                id="contact-email"
                className={css.fieldInput}
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
            </div>
            <div className={css.field}>
              <label className={css.fieldLabel} htmlFor="contact-message">
                How can we help?
              </label>
              <textarea
                id="contact-message"
                className={css.fieldTextarea}
                rows={5}
                value={message}
                onChange={e => setMessage(e.target.value)}
                required
              />
            </div>
            <button type="submit" className={css.contactSubmit}>
              Send message
            </button>
            <p className={css.contactHint}>
              This opens your email app with the message ready to send.
            </p>
          </form>

          <aside className={css.contactAside}>
            <h2 className={css.contactAsideTitle}>Other ways to reach us</h2>
            <a className={css.contactMethod} href={`mailto:${CONTACT_EMAIL}`}>
              <span className={css.contactMethodIcon}>
                <Icon name="idcard" size={22} />
              </span>
              <span>
                <span className={css.contactMethodLabel}>Email</span>
                <span className={css.contactMethodValue}>{CONTACT_EMAIL}</span>
              </span>
            </a>
            <a
              className={css.contactMethod}
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              <span className={css.contactMethodIcon}>
                <Icon name="heart" size={22} />
              </span>
              <span>
                <span className={css.contactMethodLabel}>Instagram</span>
                <span className={css.contactMethodValue}>{INSTAGRAM_HANDLE}</span>
              </span>
            </a>
            <p className={css.contactNote}>
              We're based in Goldsboro, North Carolina and usually reply within a day or two.
            </p>
          </aside>
        </div>
      </div>
    </section>
  );
};

export default SectionContactForm;
