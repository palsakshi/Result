'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('UserLogins', [{
      email: 'admin@example.com',
      password: 'admin123', // You can hash it if needed
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('UserLogins', { email: 'admin@example.com' }, {});
  }
};