// models/user_roles.js
export default (sequelize, DataTypes) => {
  const UserRole = sequelize.define(
    "UserRole",
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      role_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "roles",
          key: "role_id",
        },
        onDelete: "CASCADE", // Add CASCADE here for role_id
      },
    },
    {
      tableName: "user_roles",
      timestamps: true,
      createdAt: "created_at", // Map to the custom column name
      updatedAt: "updated_at", // Map to the custom column name
    }
  );
  UserRole.associate = (models) => {
    UserRole.belongsTo(models.User, { foreignKey: "user_id" });
    UserRole.belongsTo(models.Role, { foreignKey: "role_id" });
  };

  return UserRole;
};
