'use strict';
module.exports = function(sequelize, DataTypes) {
  var Product = sequelize.define('Product', {
    title: DataTypes.STRING,
    brand: DataTypes.STRING,
    gender: DataTypes.STRING,
    category: DataTypes.STRING,
    price: DataTypes.INTEGER,
    details: DataTypes.STRING,
    img: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Product;
};