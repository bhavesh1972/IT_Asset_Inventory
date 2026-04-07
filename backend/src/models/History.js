const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const History = sequelize.define('History', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  assetId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'assets',
      key: 'id'
    }
  },
  action: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  details: {
    type: DataTypes.TEXT
  },
  performedBy: {
    type: DataTypes.STRING(100)
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'history',
  timestamps: false,
  underscored: true
});

module.exports = History;
