'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     
     */

    await queryInterface.createTable('users', { 
      id: {
        type:Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      }, 
      first_name:{
        type:Sequelize.STRING,

      },
      last_name:{
        type:Sequelize.STRING,
      },
      email:{
        type:Sequelize.STRING,


    },
    password:{
      type:Sequelize.STRING,
    },
    token:{
      type:Sequelize.STRING,
    }

  }
    );
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
    
     */

    await queryInterface.dropTable('users');
  }
};
