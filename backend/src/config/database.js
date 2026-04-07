require("dotenv").config();
const fs = require("fs");
const { Sequelize } = require("sequelize");

function parseDbUrl() {
  console.log;
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL not set");
  const parsed = new URL(url);
  return {
    host: parsed.hostname,
    port: Number(parsed.port || 5432),
    database: parsed.pathname.replace("/", ""),
    username: decodeURIComponent(parsed.username),
    password: decodeURIComponent(parsed.password),
  };
}
const { host, username, password, port, database } = parseDbUrl();
const sequelize = new Sequelize(database, username, password, {
  host,
  port: port,
  dialect: "postgres",
  logging: process.env.NODE_ENV === "development" ? console.log : false,
  dialectOptions: {
    search_path: process.env.DB_SCHEMA || "public",
    ...(process.env.DB_SSL === "true" && {
      ssl: { rejectUnauthorized: false },
    }),
  },
  define: {
    schema: process.env.DB_SCHEMA || "public",
  },
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  define: {
    timestamps: true,
    underscored: true,
  },
});

module.exports = sequelize;
