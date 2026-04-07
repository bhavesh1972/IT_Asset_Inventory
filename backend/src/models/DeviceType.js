const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const DeviceType = sequelize.define('DeviceType', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  code: {
    type: DataTypes.INTEGER,
    allowNull: false,
    unique: true
  },
  name: {
    type: DataTypes.STRING(100),
    allowNull: false
  }
}, {
  tableName: 'device_types',
  timestamps: true,
  underscored: true
});

module.exports = DeviceType;
