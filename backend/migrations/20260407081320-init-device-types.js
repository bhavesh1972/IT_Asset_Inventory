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
        code: 6,
        name: "LED TV",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 7,
        name: "Mobile Phone",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 8,
        name: "Finger Biometric",
        created_at: now,
        updated_at: now,
      },
      { id: uuidv4(), code: 9, name: "IRIS", created_at: now, updated_at: now },
      {
        id: uuidv4(),
        code: 10,
        name: "Multifunction Printer",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 11,
        name: "A3 Multifunction Printer",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 12,
        name: "Monitor",
        created_at: now,
        updated_at: now,
      },
      { id: uuidv4(), code: 13, name: "CPU", created_at: now, updated_at: now },
      {
        id: uuidv4(),
        code: 14,
        name: "Keyboard",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 15,
        name: "Mouse",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 16,
        name: "LPRF Module",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 17,
        name: "Telephones",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 18,
        name: "Dongle",
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
      {
        id: uuidv4(),
        code: 20,
        name: "PoS Machine",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 22,
        name: "Tablet",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 23,
        name: "Dot Matrix Printer",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 24,
        name: "Assembled CPU",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 25,
        name: "Switch",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 26,
        name: "Router",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        code: 27,
        name: "QR Code Printer",
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert("device_types", deviceTypes, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("device_types", null, {});
  },
};
