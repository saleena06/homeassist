'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('service_requests', {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      provider_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'providers',
          key: 'id'
        },
        onDelete: 'CASCADE'
      },

      description: {
        type: Sequelize.TEXT
      },

      status: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable('service_requests');
  }
};