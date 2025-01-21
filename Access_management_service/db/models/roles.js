// models/roles.js
export default (sequelize, DataTypes) => {
  const Role = sequelize.define(
    "Role",
    {
      role_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Unallocated",
      },
    },
    {
      tableName: "roles",
      timestamps: true,
      createdAt: "created_at", // Map to the custom column name
      updatedAt: "updated_at", // Map to the custom column name
    }
  );

  Role.associate = (models) => {
    Role.belongsToMany(models.Permission, {
      through: models.RolePermission,
      foreignKey: "role_id",
      onDelete: "CASCADE",
    });
    Role.belongsToMany(models.User, {
      through: models.UserRole,
      foreignKey: "role_id",
      onDelete: "CASCADE",
    });
  };

  return Role;
};
