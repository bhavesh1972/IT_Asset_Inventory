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
    const transfers = [
      {
        id: uuidv4(),
        asset_id: "37408c16-c00d-4bef-aaae-fef61d83c62c",
        gate_pass_no: "1000000041",
        from_region: "Corporate Office",
        from_circle: "HQ-Bhopal",
        from_division: "Finance Department",
        from_subdivision: "Accounts Section",
        from_d_c: "Accounts DC",
        from_office: "Finance Section",
        from_person: "Old Employee",
        from_designation: "Assistant",
        to_region: "Corporate Office",
        to_circle: "HQ-Bhopal",
        to_division: "IT Department",
        to_subdivision: "SCADA Section",
        to_d_c: "SCADA DC",
        to_office: "SCADA Section, O/o MPCZ",
        to_person: "Rameshwar Chaturvedi",
        to_designation: "GM",
        to_mobile: "9406913378",
        reason: "Departmental transfer",
        authorized_by: "Siddharth Jain",
        authorized_designation: "Manager IT",
        authorized_office: "Corporate Office",
        authorized_mobile: "9876500000",
        transfer_date: "2023-09-01",
        place: "Bhopal",
        created_by: "Admin",
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert("transfers", transfers, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("transfers", null, {});
  },
};
