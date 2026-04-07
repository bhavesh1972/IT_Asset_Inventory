const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  loginName: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  loginId: {
    type: DataTypes.STRING(100),
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING(255),
    allowNull: false
  },
  fullName: {
    type: DataTypes.STRING(200),
    allowNull: false
  },
  role: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  accessLevel: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '1=Master Admin, 2=Corporate Admin, 3=Circle User'
  },
  circleCode: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  regionCode: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  status: {
    type: DataTypes.STRING(20),
    defaultValue: 'enabled'
  },
  designation: {
    type: DataTypes.STRING(200)
  },
  mobile: {
    type: DataTypes.STRING(20)
  },
  empCode: {
    type: DataTypes.STRING(50)
  }
}, {
  tableName: 'users',
  timestamps: true,
  underscored: true
});

module.exports = User;
