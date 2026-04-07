// ============================================================
// ORGANIZATIONAL HIERARCHY
// ============================================================

export const HIERARCHY = {
  "Corporate Office": {
    "HQ-Bhopal": {
      "IT Department": {
        "SCADA Section": ["SCADA DC"],
        "Network Section": ["Network DC"],
      },
      "Finance Department": {
        "Accounts Section": ["Accounts DC"],
        "Budget Section": ["Budget DC"],
      },
      "HR Department": {
        "Establishment": ["Estb. DC"],
      },
      "MD Office": {
        "MD Secretariat": ["MD DC"],
      },
    },
  },
  "Bhopal Region": {
    "Bhopal City Circle": {
      "Bhopal Urban Division-1": {
        "Arera Colony Sub-Division": ["Arera DC", "MP Nagar DC"],
        "Berasia Road Sub-Division": ["Berasia DC"],
        "Shyamla Hills Sub-Division": ["Shyamla DC"],
      },
      "Bhopal Urban Division-2": {
        "Habibganj Sub-Division": ["Habibganj DC", "New Market DC"],
        "Kolar Sub-Division": ["Kolar DC"],
      },
    },
    "Bhopal O&M Circle": {
      "Vidisha Division": {
        "Vidisha Sub-Division": ["Vidisha DC"],
        "Ganj Basoda Sub-Division": ["Ganj Basoda DC"],
      },
      "Rajgarh Division": {
        "Rajgarh Sub-Division": ["Rajgarh DC"],
      },
      "Narmadapuram Division": {
        "Narmadapuram Sub-Division": ["Narmadapuram DC"],
      },
      "Sehore Division": {
        "Sehore Sub-Division": ["Sehore DC"],
        "Ashta Sub-Division": ["Ashta DC"],
      },
      "Raisen Division": {
        "Raisen Sub-Division": ["Raisen DC"],
      },
      "Betul Division": {
        "Betul Sub-Division": ["Betul DC"],
      },
      "Harda Division": {
        "Harda Sub-Division": ["Harda DC"],
      },
    },
  },
  "Gwalior Region": {
    "Gwalior City Circle": {
      "Gwalior Urban Division": {
        "Lashkar Sub-Division": ["Lashkar DC"],
        "Morar Sub-Division": ["Morar DC"],
      },
    },
    "Gwalior O&M Circle": {
      "Gwalior Rural Division": {
        "Gwalior Rural Sub-Division": ["Gwalior Rural DC"],
      },
      "Bhind Division": {
        "Bhind Sub-Division": ["Bhind DC"],
      },
      "Morena Division": {
        "Morena Sub-Division": ["Morena DC"],
      },
      "Guna Division": {
        "Guna Sub-Division": ["Guna DC"],
      },
      "Sheopur Division": {
        "Sheopur Sub-Division": ["Sheopur DC"],
      },
      "Shivpuri Division": {
        "Shivpuri Sub-Division": ["Shivpuri DC"],
      },
      "Datia Division": {
        "Datia Sub-Division": ["Datia DC"],
      },
    },
  },
};

// Module-level mutable hierarchy — updated by HierarchyManager
let _H = JSON.parse(JSON.stringify(HIERARCHY));

// Sync function for hierarchy updates
export const syncHierarchy = (h) => {
  _H = JSON.parse(JSON.stringify(h));
};

// Get current hierarchy
export const getCurrentHierarchy = () => _H;

// Hierarchy navigation helpers
export const ALL_REGIONS = () => Object.keys(_H);

export const getCircles = (region) => {
  return region ? Object.keys(_H[region] || {}) : [];
};

export const getDivisions = (region, circle) => {
  return region && circle ? Object.keys((_H[region] || {})[circle] || {}) : [];
};

export const getSubdivisions = (region, circle, division) => {
  return region && circle && division
    ? Object.keys(((_H[region] || {})[circle] || {})[division] || {})
    : [];
};

export const getDCs = (region, circle, division, subdivision) => {
  return region && circle && division && subdivision
    ? (((_H[region] || {})[circle] || {})[division] || {})[subdivision] || []
    : [];
};
