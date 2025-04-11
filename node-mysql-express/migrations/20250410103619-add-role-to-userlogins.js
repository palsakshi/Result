module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('userlogins', 'role', {
      type: Sequelize.STRING,
      defaultValue: 'admin'
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('userlogins', 'role');
  }
};
