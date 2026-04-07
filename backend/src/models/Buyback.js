const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Buyback = sequelize.define('Buyback', {
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
  bookValue: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  buybackValue: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: false
  },
  buybackDate: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },
  vendor: {
    type: DataTypes.STRING(200)
  },
  notes: {
    type: DataTypes.TEXT
  },
  createdBy: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'buybacks',
  timestamps: true,
  underscored: true
});

module.exports = Buyback;
