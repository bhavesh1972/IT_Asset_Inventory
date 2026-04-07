const sequelize = require('../config/database');
const Asset = require('./Asset');
const Transfer = require('./Transfer');
const User = require('./User');
const History = require('./History');
const Buyback = require('./Buyback');
const DeviceType = require('./DeviceType');
const Make = require('./Make');
const Settings = require('./Settings');

// Define relationships
Asset.hasMany(Transfer, { foreignKey: 'assetId', as: 'transfers' });
Transfer.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });

Asset.hasMany(History, { foreignKey: 'assetId', as: 'history' });
History.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });

Asset.hasMany(Buyback, { foreignKey: 'assetId', as: 'buybacks' });
Buyback.belongsTo(Asset, { foreignKey: 'assetId', as: 'asset' });

// Sync database
const syncDatabase = async (force = false) => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    await sequelize.sync({ force, alter: !force });
    console.log(`✅ Database synced ${force ? '(force)' : '(alter)'}`);
  } catch (error) {
    console.error('❌ Unable to connect to the database:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  Asset,
  Transfer,
  User,
  History,
  Buyback,
  DeviceType,
  Make,
  Settings,
  syncDatabase
};
