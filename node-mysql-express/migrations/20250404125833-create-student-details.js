'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_details', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      collegeName: {
        type: Sequelize.STRING
      },
      registrationNo: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true // ✅ use unique instead of primaryKey
      },
      rollNo: {
        type: Sequelize.STRING
      },
      candidateName: {
        type: Sequelize.STRING
      },
      fatherName: {
        type: Sequelize.STRING
      },
      motherName: {
        type: Sequelize.STRING
      },
      course: {
        type: Sequelize.STRING
      },
      dob: {
        type: Sequelize.DATE
      },
      totalMarks: {
        type: Sequelize.INTEGER
      },
      marksObtained: {
        type: Sequelize.INTEGER
      },
      session: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student_details');
  }
};
