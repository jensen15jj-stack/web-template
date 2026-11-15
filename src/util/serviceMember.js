/**
 * American Neighbor: provider service line ("Air Force Veteran", "Army Active Duty").
 *
 * Branch and service status are Console user fields (Users > User fields) with IDs
 * `branch` and `serviceStatus`. Labels come from the option names set in Console, so
 * renaming an option there (e.g. "Marines" -> "Marine Corps") updates the site with no code change.
 * Ranks and bases are intentionally never shown.
 */

export const BRANCH_FIELD_KEY = 'branch';
export const SERVICE_STATUS_FIELD_KEY = 'serviceStatus';

const getOptionLabel = (userFields, key, value) => {
  if (!value) {
    return null;
  }
  const field = (userFields || []).find(f => f.key === key);
  const option = field?.enumOptions?.find(o => `${o.option}` === `${value}`);
  return option?.label || null;
};

/**
 * @param {Object} user API entity (listing author or current user)
 * @param {Object} config app config from useConfiguration()
 * @returns {string|null} e.g. "Air Force Veteran", or null if nothing is set
 */
export const getServiceLine = (user, config) => {
  const publicData = user?.attributes?.profile?.publicData || {};
  const userFields = config?.user?.userFields || [];

  const branch = getOptionLabel(userFields, BRANCH_FIELD_KEY, publicData[BRANCH_FIELD_KEY]);
  const status = getOptionLabel(
    userFields,
    SERVICE_STATUS_FIELD_KEY,
    publicData[SERVICE_STATUS_FIELD_KEY]
  );

  const parts = [branch, status].filter(Boolean);
  return parts.length > 0 ? parts.join(' ') : null;
};
