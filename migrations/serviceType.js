"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("service_types", {
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      service_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("service_types");
  },
};
