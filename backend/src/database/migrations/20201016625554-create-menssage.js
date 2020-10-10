'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('messages', {
    id: {
      type:Sequelize.INTEGER,
      allowNull: false,
      autoIncrement:true,
      primaryKey: true,
    },
    content: {
      type:Sequelize.STRING,
      allowNull:false
      },
      file_id:{
        type: Sequelize.INTEGER,
        references: { model: 'files', key: 'id' },
        onDelete: 'SET NULL',
        onUpdade: 'CASCADE',
        allowNull: true,
      },
      chat_id:{
        type: Sequelize.INTEGER,
        references: { model: 'chats', key: 'id' },
        onDelete: 'CASCADE',
        onUpdade: 'CASCADE',
        allowNull: true,
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('messages');
  }
};
