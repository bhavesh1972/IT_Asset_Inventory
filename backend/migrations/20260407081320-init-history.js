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
    const history = [
      {
        id: uuidv4(),
        asset_id: "04cb7490-8045-4d8d-8db9-75fcbeabfb51",
        action: "Created",
        details: "Asset registered in system",
        performed_by: "Admin",
        timestamp: now,
      },
      {
        id: uuidv4(),
        asset_id: "37408c16-c00d-4bef-aaae-fef61d83c62c",
        action: "Created",
        details: "Asset registered in system",
        performed_by: "Admin",
        timestamp: now,
      },
      {
        id: uuidv4(),
        asset_id: "37408c16-c00d-4bef-aaae-fef61d83c62c",
        action: "Transferred",
        details: "Transferred to SCADA Section (Gate Pass: 1000000041)",
        performed_by: "Admin",
        timestamp: now,
      },
      {
        id: uuidv4(),
        asset_id: "de7e3d78-9972-4849-b711-7cc219d9d31c",
        action: "Created",
        details: "Asset registered in system",
        performed_by: "Admin",
        timestamp: now,
      },
    ];

    await queryInterface.bulkInsert("history", history, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("history", null, {});
  },
};
