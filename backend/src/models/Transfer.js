const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transfer = sequelize.define('Transfer', {
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
  gatePassNo: {
    type: DataTypes.STRING(50),
    allowNull: false,
    unique: true
  },
  fromRegion: {
    type: DataTypes.STRING(200)
  },
  fromCircle: {
    type: DataTypes.STRING(200)
  },
  fromDivision: {
    type: DataTypes.STRING(200)
  },
  fromSubdivision: {
    type: DataTypes.STRING(200)
  },
  fromDC: {
    type: DataTypes.STRING(200)
  },
  fromOffice: {
    type: DataTypes.STRING(300)
  },
  fromPerson: {
    type: DataTypes.STRING(200)
  },
  fromDesignation: {
    type: DataTypes.STRING(200)
  },
  toRegion: {
    type: DataTypes.STRING(200)
  },
  toCircle: {
    type: DataTypes.STRING(200)
  },
  toDivision: {
    type: DataTypes.STRING(200)
  },
  toSubdivision: {
    type: DataTypes.STRING(200)
  },
  toDC: {
    type: DataTypes.STRING(200)
  },
  toOffice: {
    type: DataTypes.STRING(300)
  },
  toPerson: {
    type: DataTypes.STRING(200)
  },
  toDesignation: {
    type: DataTypes.STRING(200)
  },
  toMobile: {
    type: DataTypes.STRING(20)
  },
  reason: {
    type: DataTypes.TEXT
  },
  authorizedBy: {
    type: DataTypes.STRING(200)
  },
  authorizedDesignation: {
    type: DataTypes.STRING(200)
  },
  authorizedOffice: {
    type: DataTypes.STRING(300)
  },
  authorizedMobile: {
    type: DataTypes.STRING(20)
  },
  transferDate: {
    type: DataTypes.DATEONLY
  },
  place: {
    type: DataTypes.STRING(200)
  },
  createdBy: {
    type: DataTypes.STRING(100)
  }
}, {
  tableName: 'transfers',
  timestamps: true,
  underscored: true
});

module.exports = Transfer;
