'use strict';
const {Model} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_details extends Model {
    
    static associate(models) {
       // ✅ One student has many documents
       student_details.hasMany(models.student_documents, {
        foreignKey: 'registrationNo',
        sourceKey: 'registrationNo',
        as: 'documents'
      });
    }
  }
  student_details.init({
    collegeName: DataTypes.STRING,
    registrationNo: {
      type: DataTypes.STRING,
      unique: true, // ✅ make it unique
      allowNull: false
    },
    rollNo: DataTypes.STRING,
    candidateName: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    course: DataTypes.STRING,
    dob: DataTypes.DATE,
    totalMarks: DataTypes.INTEGER,
    marksObtained: DataTypes.INTEGER,
    session: DataTypes.STRING,
    photo: DataTypes.STRING
    
  }, {
    sequelize,
    modelName: 'student_details',
    tableName: 'student_details',
  });
  return student_details;
};