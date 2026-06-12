"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    const [count] = await queryInterface.sequelize.query(
      "SELECT COUNT(*) as count FROM service_types",
      { type: Sequelize.QueryTypes.SELECT }
    );

    if (count.count > 0) {
      console.log("service_types already seeded");
      return;
    }

    const now = new Date();

    await queryInterface.bulkInsert("service_types", [
      {
        service_name: "Plumber",
        created_at: now,
        updated_at: now,
      },
      {
        service_name: "Electrician",
        created_at: now,
        updated_at: now,
      },
      {
        service_name: "Carpenter",
        created_at: now,
        updated_at: now,
      },
      {
        service_name: "Painter",
        created_at: now,
        updated_at: now,
      },
      {
        service_name: "Cleaner",
        created_at: now,
        updated_at: now,
      },
      {
        service_name: "AC Technician",
        created_at: now,
        updated_at: now,
      },
    ]);

    console.log("service_types seeded successfully");
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("service_types", null, {});
  },
};
