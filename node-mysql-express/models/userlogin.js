'use strict';

module.exports = (sequelize, DataTypes) => {
  const UserLogin = sequelize.define('UserLogin', {
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