const {
  User,
  DeviceType,
  Make,
  Settings,
  Asset,
  Transfer,
  History,
  Buyback,
} = require("../src/models");
const { v4: uuidv4 } = require("uuid");

("use strict");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    const settings = {
      status: [
        "Within Warranty Period",
        "Beyond Warranty Period",
        "Under Repair",
        "In Transit",
        "Disposed",
        "Lost/Stolen",
      ],
      designations: [
        "CMD",
        "MD",
        "CGM",
        "GM",
        "DGM",
        "Chief Engineer",
        "Superintending Engineer",
        "Executive Engineer",
        "Assistant Engineer",
        "Junior Engineer",
        "Account Officer",
        "Senior Account Officer",
        "Manager IT",
        "Computer Operator",
        "MIS Executive",
        "Junior Engineer IT",
        "Superintendent",
        "Assistant Superintendent",
        "Steno",
        "Assistant",
        "Other",
      ],
      docTypes: [
        "Purchase Order",
        "Invoice",
        "Government Circular",
        "Office Order",
        "Work Order",
        "Warranty Card",
        "AMC Agreement",
        "Service Report",
        "Other",
      ],
      theme: {
        sidebar: "#1e1b4b",
        sidebarHover: "#312e81",
        sidebarActive: "#4c1d95",
        primary: "#7c3aed",
        primaryHover: "#6d28d9",
        primaryLight: "#ede9fe",
        primaryLighter: "#f5f3ff",
        accent: "#a855f7",
        success: "#10b981",
        successLight: "#d1fae5",
        warning: "#f59e0b",
        warningLight: "#fef3c7",
        danger: "#ef4444",
        dangerLight: "#fee2e2",
        info: "#3b82f6",
        infoLight: "#dbeafe",
        bg: "#f8fafc",
        card: "#ffffff",
        border: "#e2e8f0",
        text: "#1e293b",
        textMid: "#475569",
        textLight: "#94a3b8",
        orange: "#f97316",
        orangeLight: "#ffedd5",
      },
      policyCircular: "MD/MK/CGM(HR&A)/2659-2660 dated: 30-06-2023",
      gatePassCounter: 1000000042,
      hierarchy: {
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
      },
    };

    const settingsData = Object.entries(settings).map(([key, value]) => ({
      id: uuidv4(),
      key,
      value: JSON.stringify(value),
      created_at: new Date(),
      updated_at: new Date(),
    }));
    await queryInterface.bulkInsert("settings", settingsData, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("settings", null, {});
  },
};
