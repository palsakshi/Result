'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_documents extends Model {
    static associate(models) {
      student_documents.belongsTo(models.student_details, {
        foreignKey: 'registrationNo',
        targetKey: 'registrationNo',
        as: 'student'
      });
    }
  }
  student_documents.init({
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
  return student_documents;
};
