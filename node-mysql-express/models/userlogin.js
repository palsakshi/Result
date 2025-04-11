'use strict';

const { toDefaultValue } = require("sequelize/lib/utils");

module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define('UserLogins', {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
   
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  return UserLogin;
};