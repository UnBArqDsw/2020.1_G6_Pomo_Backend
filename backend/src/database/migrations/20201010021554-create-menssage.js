'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('message', {
    id: {
      type:Sequelize.INTEGER,
      allowNull: false,
      autoIncrement:true,
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
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

  },

  down: async (queryInterface) => {
    await queryInterface.dropTable('message');
  }
};
