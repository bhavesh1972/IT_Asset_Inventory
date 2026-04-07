// ============================================================
// ASSET UTILITIES
// ============================================================

import { THEME } from "../constants/theme";
import { GP_COUNTER, incrementGPCounter } from "../constants/masterData";
import { yearsOld } from "./dateUtils";

/**
 * Get color for asset status
 * @param {string} status - Asset status
 * @returns {string} Color code
 */
export const getStatusColor = (status) => {
  const statusColors = {
    "Within Warranty Period": THEME.success,
    "Beyond Warranty Period": THEME.danger,
    "Under Repair": THEME.warning,
    "In Transit": THEME.orange,
    "Disposed": THEME.textLight,
    "Lost/Stolen": "#7f1d1d",
  };
  return statusColors[status] || THEME.textLight;
};

/**
 * Generate a new asset ID with prefix
 * @param {string} prefix - ID prefix (e.g., "AST-")
 * @returns {string} New ID
 */
export const newId = (prefix) => {
  return `${prefix}${Date.now()}`;
};

/**
 * Generate a new gate pass number
 * @returns {string} New gate pass number
 */
export const newGatePassNo = () => {
  const gatePassNo = String(GP_COUNTER);
  incrementGPCounter();
  return gatePassNo;
};

/**
 * Check if asset is eligible for buyback (5+ years old)
 * @param {string|Date} purchaseDate - Purchase date
 * @returns {boolean} True if eligible
 */
export const buybackEligible = (purchaseDate) => {
  return yearsOld(purchaseDate) >= 5;
};

/**
 * Calculate buyback value (10% of book value + 18% GST)
 * @param {number} bookValue - Original book value
 * @returns {number} Buyback value including GST
 */
export const buybackValue = (bookValue) => {
  return bookValue ? Math.round(bookValue * 0.1 * 1.18) : 0;
};
