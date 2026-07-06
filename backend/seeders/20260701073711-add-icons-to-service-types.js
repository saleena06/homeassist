"use strict";

module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkUpdate(
      "service_types",
      { icon_name: "Wrench" },
      { service_name: "Plumber" }
    );


    await queryInterface.bulkUpdate(
      "service_types",
      { icon_name: "Zap" },
      { service_name: "Electrician" }
    );

    

    await queryInterface.bulkUpdate(
      "service_types",
      { icon_name: "Hammer" },
      { service_name: "Carpenter" }
    );

    
    await queryInterface.bulkUpdate(
      "service_types",
      { icon_name: "Paintbrush" },
      { service_name: "Painter" }
    );

    
  },

  async down(queryInterface) {
    await queryInterface.bulkUpdate(
      "service_types",
      { icon_name: null },
      {}
    );
  },
};