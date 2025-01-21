"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("permissions", [
      {
        name: "Create",
        description: "Create resources",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Read",
        description: "Read resources",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Update",
        description: "Update resources",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Delete",
        description: "Delete resources",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("permissions", null, {});
  },
};
