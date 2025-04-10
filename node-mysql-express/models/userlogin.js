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
    }, 
    role: {
      type: DataTypes.STRING,
      defaultValue: 'admin1'  // ✅ Corrected
    },
    name: {
      type: DataTypes.STRING,
      defaultValue: 'Admin'  // ✅ Already correct
    }
  });

  return UserLogin;
};
