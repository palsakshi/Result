'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('student_documents', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      registrationNo: {
        type: Sequelize.STRING,
        allowNull: false, // ✅ required for FK
        references: {
          model: 'student_details', // ✅ this must match table name
          key: 'registrationNo'     // ✅ this must match column name
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
      },
      filePath: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.fn('NOW')
      }
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('student_documents');
  }
};
