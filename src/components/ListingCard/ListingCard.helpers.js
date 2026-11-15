import { displayPrice, isPriceVariationsEnabled } from '../../util/configHelpers';
import { formatMoney } from '../../util/currency';
import { richText } from '../../util/richText';
import { getAllInPrice, hasCustomerFee } from '../../util/allInPrice';
import { getServiceLine } from '../../util/serviceMember';
import {
  isBookingProcessAlias,
  NEGOTIATION_PROCESS_NAME,
} from '../../transactions/transaction';

import css from './ListingCard.module.css';

const MIN_LENGTH_FOR_LONG_WORDS = 10;

const priceData = (price, currency, intl) => {
  if (price && price.currency === currency) {
    const formattedPrice = formatMoney(intl, price);
    return { formattedPrice, priceTooltip: formattedPrice };
  } else if (price) {
    return {
      formattedPrice: intl.formatMessage(
        { id: 'ListingCard.unsupportedPrice' },
        { currency: price.currency }
      ),
      priceTooltip: intl.formatMessage(
        { id: 'ListingCard.unsupportedPriceTitle' },
        { currency: price.currency }
      ),
    };
  }
  return {};
};

const isNegotiationProcessAlias = processAlias =>
  typeof processAlias === 'string' && processAlias.split('/')[0] === NEGOTIATION_PROCESS_NAME;

// "Jensen J." style short name; falls back to the display name.
const getAuthorNames = author => {
  const profile = author?.attributes?.profile || {};
  const displayName = profile.displayName || '';
  const initials =
    profile.abbreviatedName ||
    displayName
      .split(' ')
      .filter(Boolean)
      .map(part => part[0])
      .join('')
      .slice(0, 2)
      .toUpperCase();
  return { displayName, initials };
};

/**
 * Returns all translated and formatted strings for ListingCard so the
 * presentational component can stay simple and aria-labels use the same copy.
 *
 * American Neighbor changes:
 * - Prices are shown all-in (provider's rate + customer service fee), so the
 *   number on the card is what the hirer pays. Checkout itemizes the fee.
 * - Unit labels: "/ hr" for hourly, "flat" for fixed-length services.
 * - Request-for-quote listings show "Request a quote" instead of a price.
 * - serviceLine: "<Branch> <Status>" from the provider's profile (no ranks or bases).
 *
 * @param {Object} listing - API entity: listing or ownListing
 * @param {Object} config - app configuration (e.g. from useConfiguration())
 * @param {Object} intl - React Intl instance (e.g. from useIntl())
 * @returns {Object} translations and derived values
 */
export const getListingCardTranslations = (listing, config, intl) => {
  const { title = '', price, publicData } = listing?.attributes || {};
  const author = listing?.author;

  const { displayName: authorDisplayName, initials: authorInitials } = getAuthorNames(author);
  const authorName = intl.formatMessage(
    { id: 'ListingCard.author' },
    { authorName: authorDisplayName }
  );
  const serviceLine = getServiceLine(author, config);

  const validListingTypes = config.listing.listingTypes || [];
  const { listingType, transactionProcessAlias, unitType } = publicData || {};
  const listingTypeConfig = validListingTypes.find(conf => conf.listingType === listingType);

  const isQuote = isNegotiationProcessAlias(transactionProcessAlias);
  const showPrice = !isQuote && displayPrice(listingTypeConfig) && !!price;

  const allInPrice = showPrice ? getAllInPrice(price, config.commission) : null;
  const { formattedPrice, priceTooltip: rawTooltip } = priceData(allInPrice, config.currency, intl);
  const includesFee = showPrice && hasCustomerFee(config.commission);
  const priceTooltip = includesFee
    ? intl.formatMessage({ id: 'ListingCard.allInTooltip' }, { formattedPrice })
    : rawTooltip;

  const isPriceVariationsInUse = isPriceVariationsEnabled(publicData, listingTypeConfig);
  const hasMultiplePriceVariants = isPriceVariationsInUse && publicData?.priceVariants?.length > 1;
  const isBookable = isBookingProcessAlias(transactionProcessAlias);

  const priceMessageId = hasMultiplePriceVariants
    ? 'ListingCard.priceStartingFrom'
    : 'ListingCard.price';

  const perUnitString = isBookable
    ? intl.formatMessage({ id: 'ListingCard.anPerUnit' }, { unitType })
    : '';

  // Visible price block uses JSX spans for styling; aria-label needs a plain string.
  const priceValue = <span className={css.priceValue}>{formattedPrice}</span>;
  const pricePerUnit = perUnitString ? <span className={css.perUnit}>{perUnitString}</span> : '';
  const priceMessage =
    showPrice && formattedPrice != null
      ? intl.formatMessage({ id: priceMessageId }, { priceValue, pricePerUnit })
      : isQuote
      ? intl.formatMessage({ id: 'ListingCard.requestQuote' })
      : '';

  const priceMessagePlain =
    showPrice && formattedPrice != null
      ? intl.formatMessage(
          { id: priceMessageId },
          { priceValue: formattedPrice, pricePerUnit: perUnitString }
        )
      : isQuote
      ? intl.formatMessage({ id: 'ListingCard.requestQuote' })
      : '';

  const cardAriaLabel =
    priceMessagePlain.length > 0
      ? intl.formatMessage(
          { id: 'ListingCard.screenreader.label' },
          { listingTitle: title, formattedPrice: priceMessagePlain }
        )
      : title;

  return {
    titlePlain: title,
    titleFormatted: richText(title, {
      longWordMinLength: MIN_LENGTH_FOR_LONG_WORDS,
      longWordClass: css.longWord,
    }),
    authorName,
    authorInitials,
    serviceLine,
    showPrice: showPrice || isQuote,
    isQuote,
    priceTooltip,
    priceMessage,
    cardAriaLabel,
  };
};
