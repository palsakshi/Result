'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('userlogins', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'admin'
    });

    await queryInterface.addColumn('userlogins', 'name', {
      type: Sequelize.STRING,
      defaultValue: 'Admin1'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('userlogins', 'role');
    await queryInterface.removeColumn('userlogins', 'name');
  }
};
