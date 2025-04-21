'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class studentdocuments extends Model {
    static associate(models) {
      studentdocuments.belongsTo(models.student_details, {
        foreignKey: 'registrationNo',
        targetKey: 'registrationNo',
        as: 'student'
      });
    }
  }
  studentdocuments.init({
    registrationNo: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'student_documents',
    tableName: 'student_documents',
  });
  return studentdocuments;
};
