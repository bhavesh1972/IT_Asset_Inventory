require("dotenv").config({ path: "../.env" });

const config = {
  url: process.env.DATABASE_URL,
  dialect: "postgres",
  dialectOptions: {
    ssl: process.env.DB_SSL === "true" ? { rejectUnauthorized: false } : false,
    search_path: process.env.DB_SCHEMA || "public",
  },
  schema: process.env.DB_SCHEMA || "public",
};

module.exports = {
  local: config,
  dev: config,
  production: config,
  // Sequelize CLI compat aliases
  development: config,
  test: config,
};
