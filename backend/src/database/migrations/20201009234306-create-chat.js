'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {

     await queryInterface.createTable('chat', {
        id: {
          type:Sequelize.INTEGER,
          allowNull: false,
          autoIncrement:true,
        },
        message_id: {
          type: Sequelize.INTEGER,
          references: { model: 'messages', key: 'id' },
          onDelete: 'SET NULL',
          onUpdade: 'CASCADE',
        allowNull:false
        },
        user_id: {
          type: Sequelize.INTEGER,
          references: { model: 'users', key: 'id' },
          onDelete: 'SET NULL',
          onUpdade: 'CASCADE',
          allowNull: true,
        },
        receiver_id: {
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
