// Initialize server data from constants
const fetch = require('node-fetch');

const API_URL = 'http://localhost:3001/api';

// Import initial data (you may need to adjust paths)
const INITIAL_DATA = {
  users: [
    { id: 1, loginName: "Admin", loginId: "admin", password: "Pass@123", fullName: "siddharth_jain", role: "Master Admin", accessLevel: 1, circleCode: 0, regionCode: 0, status: "enabled", designation: "Manager IT", mobile: "9876500000", empCode: "SDHJAIN001" },
    { id: 2, loginName: "Corporate", loginId: "ams_corporate", password: "Pass@123", fullName: "Corporate Admin", role: "Corporate Admin", accessLevel: 2, circleCode: 0, regionCode: 0, status: "enabled", designation: "Account Officer", mobile: "9876500001", empCode: "CORP001" },
    { id: 3, loginName: "GM-O&M Bhopal", loginId: "gm_o&m_bhopal", password: "Pass@123", fullName: "GM-O&M Bhopal", role: "Circle User", accessLevel: 3, circleCode: 201, regionCode: 2, status: "enabled", designation: "General Manager", mobile: "6232913600", empCode: "93421418" },
  ],

  deviceTypes: [
    { code: 1, name: "Desktop" },
    { code: 2, name: "Printer" },
    { code: 3, name: "UPS" },
    { code: 4, name: "Laptop" },
    { code: 5, name: "Scanner" },
    { code: 19, name: "All In One PC" },
  ],

  makes: [
    { code: 11, name: "Acer", deviceCode: 1 },
    { code: 12, name: "Dell", deviceCode: 1 },
    { code: 22, name: "HP", deviceCode: 2 },
    { code: 44, name: "Dell", deviceCode: 4 },
    { code: 121, name: "Acer", deviceCode: 19 },
  ],

  hierarchy: {
    "Corporate Office": {
      "HQ-Bhopal": {
        "IT Department": {
          "SCADA Section": ["SCADA DC"],
          "Network Section": ["Network DC"]
        },
        "Finance Department": {
          "Accounts Section": ["Accounts DC"],
          "Budget Section": ["Budget DC"]
        }
      }
    },
    "Bhopal Region": {
      "Bhopal City Circle": {
        "Bhopal Urban Division-1": {
          "Arera Colony Sub-Division": ["Arera DC", "MP Nagar DC"]
        }
      }
    }
  },

  settings: {
    status: ["Within Warranty Period", "Beyond Warranty Period", "Under Repair", "In Transit", "Disposed", "Lost/Stolen"],
    designations: ["CMD", "MD", "CGM", "GM", "DGM", "Manager IT", "Account Officer", "Executive Engineer", "Assistant Engineer"],
    docTypes: ["Purchase Order", "Invoice", "Government Circular", "Office Order", "Work Order", "Warranty Card", "AMC Agreement", "Service Report", "Other"]
  },

  assets: [],
  transfers: [],
  history: [],
  buybacks: []
};

async function initializeData() {
  try {
    console.log('Initializing data on server...');

    const response = await fetch(`${API_URL}/initialize`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(INITIAL_DATA)
    });

    const result = await response.json();
    console.log('✅ Data initialized successfully:', result);
  } catch (error) {
    console.error('❌ Failed to initialize data:', error);
  }
}

initializeData();
