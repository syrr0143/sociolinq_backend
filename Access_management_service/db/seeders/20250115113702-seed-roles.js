"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert("roles", [
      { name: "Admin", created_at: new Date(), updated_at: new Date() },
      { name: "User", created_at: new Date(), updated_at: new Date() },
    ]);
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("roles", null, {});
  },
};
