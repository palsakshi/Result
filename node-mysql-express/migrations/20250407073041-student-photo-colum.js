'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addColumn('student_details', 'photo', {
      type: Sequelize.STRING,
      allowNull: false // make false if you want it required
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeColumn('student_details', 'photo');
  }
};
