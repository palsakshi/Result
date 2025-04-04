'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('user_tables', [{
      first_name: 'Admin',
      last_name: 'User',
      email: 'admin@example.com',
      password: 'admin123', // optionally hash this using bcrypt
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('user_tables', { email: 'admin@example.com' }, {});
  }
};

