"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("users", "city", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });

    await queryInterface.addColumn("users", "address", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "",
    });

    await queryInterface.addColumn("users", "date_of_birth", {
      type: Sequelize.DATEONLY,
      allowNull: true,
    });

    await queryInterface.addColumn("users", "gender", {
      type: Sequelize.ENUM("male", "female", "other"),
      allowNull: false,
      defaultValue: "other",
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("users", "gender");
    await queryInterface.removeColumn("users", "date_of_birth");
    await queryInterface.removeColumn("users", "address");
    await queryInterface.removeColumn("users", "city");

    await queryInterface.sequelize.query(
      'DROP TYPE IF EXISTS "enum_users_gender";'
    );
  },
};