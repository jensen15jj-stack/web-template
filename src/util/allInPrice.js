import Decimal from 'decimal.js';
import { types as sdkTypes } from './sdkLoader';

const { Money } = sdkTypes;

/**
 * American Neighbor: all-in pricing.
 *
 * Hirers pay a service fee (the Console "customer commission") on top of the provider's rate.
 * Cards and the order panel show the all-in number so the price never jumps at checkout;
 * checkout itemizes rate + fee from the server's line items.
 *
 * This mirrors server/api-util/lineItemHelpers.js getCustomerCommissionMaybe:
 * fee = max(round(amount * percentage / 100), minimum_amount)
 * The server is the source of truth for what is actually charged.
 */

const hasPositive = n => typeof n === 'number' && n > 0;

/**
 * Customer service fee for a given order amount.
 *
 * @param {Money} amount order amount before the fee (e.g. one hour, or a flat price)
 * @param {Object} customerCommission { percentage, minimum_amount } from config.commission
 * @returns {Money|null} fee, or null when there is no customer fee
 */
export const getCustomerFee = (amount, customerCommission) => {
  if (!(amount instanceof Money)) {
    return null;
  }
  const { percentage, minimum_amount } = customerCommission || {};
  if (!hasPositive(percentage) && !hasPositive(minimum_amount)) {
    return null;
  }

  const fromPercentage = hasPositive(percentage)
    ? new Decimal(amount.amount)
        .times(percentage)
        .dividedBy(100)
        .toNearest(1, Decimal.ROUND_HALF_UP)
        .toNumber()
    : 0;
  const minimum = hasPositive(minimum_amount) ? minimum_amount : 0;
  const fee = Math.max(fromPercentage, minimum);

  return fee > 0 ? new Money(fee, amount.currency) : null;
};

/**
 * All-in price shown to hirers: provider's price + customer service fee.
 * For hourly listings this is the cost of one hour (the shortest booking), so a
 * minimum fee is reflected in the per-hour number when it applies.
 *
 * @param {Money} price provider's listing price
 * @param {Object} commission config.commission ({ customerCommission, providerCommission })
 * @returns {Money} all-in price (or the original price when there is no fee)
 */
export const getAllInPrice = (price, commission) => {
  const fee = getCustomerFee(price, commission?.customerCommission);
  if (!fee) {
    return price;
  }
  return new Money(price.amount + fee.amount, price.currency);
};

/**
 * Whether the marketplace currently adds a customer fee.
 * @param {Object} commission config.commission
 * @returns {boolean}
 */
export const hasCustomerFee = commission => {
  const { percentage, minimum_amount } = commission?.customerCommission || {};
  return hasPositive(percentage) || hasPositive(minimum_amount);
};
