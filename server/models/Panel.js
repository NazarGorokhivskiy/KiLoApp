const { DataTypes } = require("sequelize");
const { sequelize } = require("../db");

const Panel = sequelize.define("panel", {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING
  },
  quantity: {
    type: DataTypes.INTEGER
  },
  department: {
    type: DataTypes.STRING
  },
  producer: {
    type: DataTypes.STRING
  },
  market_adress: {
    type: DataTypes.STRING
  },
  image: {
    type: DataTypes.STRING
  }
});

module.exports = Panel;
