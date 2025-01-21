"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("roles", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "Unallocated", // Updated default value
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("roles", "name", {
      type: Sequelize.STRING,
      allowNull: false,
      defaultValue: "", // Revert to previous default value if rolling back
    });
  },
};
