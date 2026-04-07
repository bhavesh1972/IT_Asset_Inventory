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
    // Create users with generated UUIDs
    const now = new Date();
    const users = [
      {
        id: uuidv4(),
        login_name: "Admin",
        login_id: "admin",
        password: "Pass@123",
        full_name: "siddharth_jain",
        role: "Master Admin",
        access_level: 1,
        circle_code: 0,
        region_code: 0,
        status: "enabled",
        designation: "Manager IT",
        mobile: "9876500000",
        emp_code: "SDHJAIN001",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        login_name: "Corporate",
        login_id: "ams_corporate",
        password: "Pass@123",
        full_name: "Corporate Admin",
        role: "Corporate Admin",
        access_level: 2,
        circle_code: 0,
        region_code: 0,
        status: "enabled",
        designation: "Account Officer",
        mobile: "9876500001",
        emp_code: "CORP001",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        login_name: "GM-O&M Bhopal",
        login_id: "gm_o&m_bhopal",
        password: "Pass@123",
        full_name: "GM-O&M Bhopal",
        role: "Circle User",
        access_level: 3,
        circle_code: 201,
        region_code: 2,
        status: "enabled",
        designation: "General Manager",
        mobile: "6232913600",
        emp_code: "93421418",
        created_at: now,
        updated_at: now,
      },
    ];

    // Create device types
    const deviceTypes = [
      {
        id: uuidv4(),
        code: 1,
        name: "Desktop",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 2,
        name: "Printer",
        created_at: now,
        updated_at: now,
      },
      { id: uuidv4(), code: 3, name: "UPS", created_at: now, updated_at: now },
      {
        id: uuidv4(),
        code: 4,
        name: "Laptop",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 5,
        name: "Scanner",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 19,
        name: "All In One PC",
        created_at: now,
        updated_at: now,
      },
    ];

    // Create makes
    const makes = [
      {
        id: uuidv4(),
        code: 11,
        name: "Acer",
        device_code: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 12,
        name: "Dell",
        device_code: 1,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 22,
        name: "HP",
        device_code: 2,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 44,
        name: "Dell",
        device_code: 4,
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 121,
        name: "Acer",
        device_code: 19,
        created_at: now,
        updated_at: now,
      },
    ];

    // Create settings
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
        "Manager IT",
        "Account Officer",
        "Executive Engineer",
        "Assistant Engineer",
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
    };

    // Insert data using queryInterface for direct table insertion
    await queryInterface.bulkInsert("users", users, {});
    await queryInterface.bulkInsert("device_types", deviceTypes, {});
    await queryInterface.bulkInsert("makes", makes, {});

    // Insert settings
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
    // Delete all seeded data
    await queryInterface.bulkDelete("users", null, {});
    await queryInterface.bulkDelete("device_types", null, {});
    await queryInterface.bulkDelete("makes", null, {});
    await queryInterface.bulkDelete("settings", null, {});
  },
};
