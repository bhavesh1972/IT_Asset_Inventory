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
      {
        id: uuidv4(),
        login_name: "GM-O&M Vidisha",
        login_id: "gm_o&m_vidisha",
        password: "Pass@123",
        full_name: "GM-O&M Vidisha",
        role: "Circle User",
        access_level: 3,
        circle_code: 207,
        region_code: 2,
        status: "enabled",
        designation: "General Manager",
        mobile: "6232913800",
        emp_code: "92386266",
        created_at: now,
        updated_at: now,
      },
      {
        id: uuidv4(),
        login_name: "GM-City Bhopal",
        login_id: "gm_city_bhopal",
        password: "Pass@123",
        full_name: "GM-City Circle Bhopal",
        role: "Circle User",
        access_level: 3,
        circle_code: 203,
        region_code: 2,
        status: "enabled",
        designation: "General Manager",
        mobile: "6232913400",
        emp_code: "93326096",
        created_at: now,
        updated_at: now,
      },
    ];

    await queryInterface.bulkInsert("users", users, {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("users", null, {});
  },
};

# task_progress
- [x] Create users migration file
- [ ] Create deviceTypes migration file
- [ ] Create makes migration file
- [ ] Create hierarchy migration file
- [ ] Create settings migration file
- [ ] Create assets migration file
- [ ] Create transfers migration file
- [ ] Create history migration file
- [ ] Create buybacks migration file
</task_progress>