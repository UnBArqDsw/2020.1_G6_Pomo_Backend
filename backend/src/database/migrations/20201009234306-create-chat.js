'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('chat', {
        id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          autoIncrement:true,
        },
        message: {
        type:Sequelize.STRING,
        allowNull:false
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onDelete: 'SET NULL',
          onUpdade: 'CASCADE',
          allowNull: true,
        },
        receiver: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onDelete: 'SET NULL',
          onUpdade: 'CASCADE',
          allowNull: true,
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },

       });

  },

  down: async (queryInterface) => {

    await queryInterface.dropTable('chat');

  }
};
