const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Asset = sequelize.define('Asset', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  gatePassNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  deviceCode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  deviceName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  makeCode: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  makeName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  model: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  serialNo: {
    type: DataTypes.STRING(200),
    allowNull: false,
    unique: true
  },
  purchaseDate: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  warrantyEnd: {
    type: DataTypes.DATEONLY,
    allowNull: true
  },
  bookValue: {
    type: DataTypes.DECIMAL(12, 2),
    allowNull: true,
    defaultValue: 0
  },
  invoiceNo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  poNo: {
    type: DataTypes.STRING(100),
    allowNull: true
  },
  status: {
    type: DataTypes.STRING(100),
    allowNull: false,
    defaultValue: 'Within Warranty Period'
  },
  region: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  circle: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  division: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  subdivision: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  dc: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  office: {
    type: DataTypes.STRING(300),
    allowNull: true
  },
  assignedTo: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  designation: {
    type: DataTypes.STRING(200),
    allowNull: true
  },
  mobile: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  room: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  transferCount: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  docReferences: {
    type: DataTypes.JSONB,
    allowNull: true,
    defaultValue: []
  },
  createdBy: {
    type: DataTypes.STRING(100),
    allowNull: true
  }
}, {
  tableName: 'assets',
  timestamps: true,
  underscored: true
});

module.exports = Asset;
