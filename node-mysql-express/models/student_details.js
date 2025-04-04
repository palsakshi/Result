'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_details extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_details.init({
    collegeName: DataTypes.STRING,
    registrationNo: DataTypes.STRING,
    rollNo: DataTypes.STRING,
    candidateName: DataTypes.STRING,
    fatherName: DataTypes.STRING,
    motherName: DataTypes.STRING,
    course: DataTypes.STRING,
    dob: DataTypes.DATE,
    totalMarks: DataTypes.INTEGER,
    marksObtained: DataTypes.INTEGER,
    session: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'student_details',
  });
  return student_details;
};