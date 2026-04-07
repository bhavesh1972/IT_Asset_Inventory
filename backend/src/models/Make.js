const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Make = sequelize.define('Make', {
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
  },
  deviceCode: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'makes',
  timestamps: true,
  underscored: true
});

module.exports = Make;
