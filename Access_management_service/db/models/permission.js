// models/permissions.js
export default (sequelize, DataTypes) => {
  const Permission = sequelize.define(
    "Permission",
    {
      permission_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "permissions",
      timestamps: true,
      createdAt: "created_at", // Map to the custom column name
      updatedAt: "updated_at", // Map to the custom column name
    }
  );

  Permission.associate = (models) => {
    Permission.belongsToMany(models.Role, {
      through: models.RolePermission,
      foreignKey: "permission_id",
      onDelete: "CASCADE",
    });
  };

  return Permission;
};
