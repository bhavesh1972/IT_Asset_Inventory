// ============================================================
// USER PERMISSION UTILITIES
// ============================================================

/**
 * Check if user can edit (Master Admin or Corporate Admin)
 * @param {Object} user - User object
 * @returns {boolean} True if user can edit
 */
export const canEdit = (user) => {
  return user && user.accessLevel <= 2;
};

/**
 * Check if user is Master Admin
 * @param {Object} user - User object
 * @returns {boolean} True if Master Admin
 */
export const isMasterAdmin = (user) => {
  return user && user.accessLevel === 1;
};

/**
 * Check if user is Corporate Admin
 * @param {Object} user - User object
 * @returns {boolean} True if Corporate Admin
 */
export const isCorporateAdmin = (user) => {
  return user && user.accessLevel === 2;
};

/**
 * Check if user is Circle User
 * @param {Object} user - User object
 * @returns {boolean} True if Circle User
 */
export const isCircleUser = (user) => {
  return user && user.accessLevel === 3;
};

/**
 * Get user role display name
 * @param {Object} user - User object
 * @returns {string} Role name
 */
export const getUserRoleName = (user) => {
  if (!user) return "Unknown";
  if (isMasterAdmin(user)) return "Master Admin";
  if (isCorporateAdmin(user)) return "Corporate Admin";
  if (isCircleUser(user)) return "Circle User";
  return user.role || "Unknown";
};
