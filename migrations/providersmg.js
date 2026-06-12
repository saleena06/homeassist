"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("providers", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      phone: {
        type: Sequelize.STRING,
      },

      email: {
        type: Sequelize.STRING,
        unique: true,
      },

      experience_years: {
        type: Sequelize.INTEGER,
      },

      city: {
        type: Sequelize.STRING,
      },

      address: {
        type: Sequelize.TEXT,
      },

      service_type_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "service_types",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      rating: {
        type: Sequelize.FLOAT,
        defaultValue: 0,
      },

      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },

      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("providers");
  },
};
