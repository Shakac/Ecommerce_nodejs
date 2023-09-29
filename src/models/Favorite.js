const { DataTypes } = require('sequelize');
const sequelize = require('../utils/connection');

const Favorite = sequelize.define('favorite', {
  rate: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  // userId;
  // newsId;
});

module.exports = Favorite;