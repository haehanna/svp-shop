'use strict';
module.exports = function(sequelize, DataTypes) {
  var Jumbotron = sequelize.define('Jumbotron', {
    title: DataTypes.STRING,
    img: DataTypes.STRING,
    active: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return Jumbotron;
};