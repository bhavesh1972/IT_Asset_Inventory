// ============================================================
// CSV PARSING UTILITIES
// ============================================================

/**
 * Parse CSV text to array of objects
 * @param {string} text - CSV text content
 * @returns {Array<Object>} Array of parsed objects
 */
export const parseCSV = (text) => {
  const lines = text.trim().split("\n");

  if (lines.length < 2) {
    return [];
  }

  // Parse headers
  const headers = lines[0]
    .split(",")
    .map((header) => header.trim().replace(/"/g, ""));

  // Parse data rows
  return lines.slice(1).map((line) => {
    const values = line.split(",").map((value) => value.trim().replace(/"/g, ""));
    const obj = {};

    headers.forEach((header, index) => {
      obj[header] = values[index] || "";
    });

    return obj;
  });
};

/**
 * Convert array of objects to CSV string
 * @param {Array<Object>} data - Array of objects to convert
 * @param {Array<string>} headers - Optional array of headers (uses object keys if not provided)
 * @returns {string} CSV string
 */
export const toCSV = (data, headers = null) => {
  if (!data || data.length === 0) {
    return "";
  }

  // Use provided headers or extract from first object
  const csvHeaders = headers || Object.keys(data[0]);

  // Create header row
  const headerRow = csvHeaders.map((h) => `"${h}"`).join(",");

  // Create data rows
  const dataRows = data.map((row) => {
    return csvHeaders
      .map((header) => {
        const value = row[header] || "";
        return `"${String(value).replace(/"/g, '""')}"`;
      })
      .join(",");
  });

  return [headerRow, ...dataRows].join("\n");
};
