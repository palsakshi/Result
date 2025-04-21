'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn('UserLogins', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'admin'
    });

    await queryInterface.addColumn('UserLogins', 'name', {
      type: Sequelize.STRING,
      defaultValue: 'Admin1'
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('UserLogins', 'role');
    await queryInterface.removeColumn('UserLogins', 'name');
  }
};
