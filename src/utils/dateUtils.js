// ============================================================
// DATE & TIME UTILITIES
// ============================================================

import moment from "moment-timezone";

// Set default timezone to Indian Standard Time
const TIMEZONE = "Asia/Kolkata";

/**
 * Format a date to Indian locale format (DD MMM YYYY)
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date or "-"
 */
export const formatDate = (date) => {
  return date ? moment(date).tz(TIMEZONE).format("DD MMM YYYY") : "-";
};

/**
 * Format a date to Indian locale datetime format
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted datetime or "-"
 */
export const formatDateTime = (date) => {
  return date ? moment(date).tz(TIMEZONE).format("DD MMM YYYY, hh:mm A") : "-";
};

/**
 * Calculate years between a date and now
 * @param {string|Date} date - Date to calculate from
 * @returns {number} Years old
 */
export const yearsOld = (date) => {
  return date ? moment().diff(moment(date), "years", true) : 0;
};

/**
 * Get current date/time in IST
 * @returns {moment.Moment} Current moment in IST
 */
export const now = () => {
  return moment().tz(TIMEZONE);
};

/**
 * Parse a date string in IST
 * @param {string} dateString - Date string to parse
 * @returns {moment.Moment} Parsed moment object
 */
export const parseDate = (dateString) => {
  return moment.tz(dateString, TIMEZONE);
};
