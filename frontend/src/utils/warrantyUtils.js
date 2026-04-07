// ============================================================
// WARRANTY UTILITIES
// ============================================================

import moment from "moment-timezone";
import { THEME } from "../constants/theme";

const TIMEZONE = "Asia/Kolkata";

/**
 * Check if warranty has expired
 * @param {string|Date} warrantyEndDate - Warranty end date
 * @returns {boolean} True if expired
 */
export const isWarrantyExpired = (warrantyEndDate) => {
  if (!warrantyEndDate) return false;
  return moment(warrantyEndDate).tz(TIMEZONE).isBefore(moment().tz(TIMEZONE));
};

/**
 * Check if warranty is expiring soon (within 90 days)
 * @param {string|Date} warrantyEndDate - Warranty end date
 * @returns {boolean} True if expiring soon
 */
export const isWarrantyExpiringSoon = (warrantyEndDate) => {
  if (!warrantyEndDate) return false;
  const endDate = moment(warrantyEndDate).tz(TIMEZONE);
  const now = moment().tz(TIMEZONE);
  const daysRemaining = endDate.diff(now, "days");
  return daysRemaining > 0 && daysRemaining <= 90;
};

/**
 * Get warranty status with label and color
 * @param {string|Date} warrantyEndDate - Warranty end date
 * @returns {{label: string, color: string}} Status object
 */
export const getWarrantyStatus = (warrantyEndDate) => {
  if (!warrantyEndDate) {
    return { label: "Unknown", color: THEME.textLight };
  }

  if (isWarrantyExpired(warrantyEndDate)) {
    return { label: "Beyond Warranty Period", color: THEME.danger };
  }

  if (isWarrantyExpiringSoon(warrantyEndDate)) {
    return { label: "Expiring Soon", color: THEME.warning };
  }

  return { label: "Within Warranty Period", color: THEME.success };
};

/**
 * Calculate days remaining in warranty
 * @param {string|Date} warrantyEndDate - Warranty end date
 * @returns {number} Days remaining (negative if expired)
 */
export const daysRemainingInWarranty = (warrantyEndDate) => {
  if (!warrantyEndDate) return 0;
  const endDate = moment(warrantyEndDate).tz(TIMEZONE);
  const now = moment().tz(TIMEZONE);
  return endDate.diff(now, "days");
};
