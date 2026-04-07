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
    const buybacks = [];

    // await queryInterface.bulkInsert("buybacks", buybacks, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("buybacks", null, {});
  },
};
