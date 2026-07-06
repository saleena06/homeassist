"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.sequelize.query(`
      ALTER TABLE "service_requests"
      ALTER COLUMN "status"
      TYPE VARCHAR
      USING (
        CASE
          WHEN status = true THEN 'accepted'
          WHEN status = false THEN 'pending'
          ELSE 'pending'
        END
      );
    `);
  
    await queryInterface.changeColumn("service_requests", "status", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "pending",
    });
  }
};