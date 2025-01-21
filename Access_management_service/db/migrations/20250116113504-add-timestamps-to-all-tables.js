"use strict";

export default {
  up: async (queryInterface, Sequelize) => {
    // Alter 'users' table
    await queryInterface.addColumn("users", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("users", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });

    // Alter 'roles' table
    await queryInterface.addColumn("roles", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("roles", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });

    // Alter 'user_roles' table
    await queryInterface.addColumn("user_roles", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("user_roles", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });

    // Alter 'user_metadata' table
    await queryInterface.addColumn("user_metadata", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("user_metadata", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });

    // Alter 'permissions' table (Already exists but ensure the consistency)
    await queryInterface.addColumn("permissions", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("permissions", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });

    // Alter 'role_permissions' table
    await queryInterface.addColumn("role_permissions", "created_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
    });
    await queryInterface.addColumn("role_permissions", "updated_at", {
      type: Sequelize.DATE,
      allowNull: false,
      defaultValue: Sequelize.literal(
        "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
      ),
    });
  },

  down: async (queryInterface, Sequelize) => {
    // Remove columns in the 'up' section (revert the changes)
    await queryInterface.removeColumn("users", "created_at");
    await queryInterface.removeColumn("users", "updated_at");

    await queryInterface.removeColumn("roles", "created_at");
    await queryInterface.removeColumn("roles", "updated_at");

    await queryInterface.removeColumn("user_roles", "created_at");
    await queryInterface.removeColumn("user_roles", "updated_at");

    await queryInterface.removeColumn("user_metadata", "created_at");
    await queryInterface.removeColumn("user_metadata", "updated_at");

    await queryInterface.removeColumn("permissions", "created_at");
    await queryInterface.removeColumn("permissions", "updated_at");

    await queryInterface.removeColumn("role_permissions", "created_at");
    await queryInterface.removeColumn("role_permissions", "updated_at");
  },
};
