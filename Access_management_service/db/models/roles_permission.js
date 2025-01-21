// models/role_permissions.js
export default (sequelize, DataTypes) => {
  const RolePermission = sequelize.define(
    "RolePermission",
    {
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "role_id",
        },
        onDelete: "CASCADE",
      },
      permission_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "permissions",
          key: "permission_id",
        },
        onDelete: "CASCADE",
      },
    },
    {
      tableName: "role_permissions",
      timestamps: true,
      createdAt: "created_at", // Map to the custom column name
      updatedAt: "updated_at", // Map to the custom column name
    }
  );

  return RolePermission;
};
