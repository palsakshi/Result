'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class user_table extends Model {
    static associate(models) {
      // associations (if any)
    }
  }
  user_table.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user_table',
  });

  return user_table;
};
 // export the model