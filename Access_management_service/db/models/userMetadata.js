// models/user_metadata.js
export default (sequelize, DataTypes) => {
  const UserMetadata = sequelize.define(
    "UserMetadata",
    {
      metadata_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "user_id",
        },
      },
      field_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      field_value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "user_metadata",
      timestamps: true,
      createdAt: "created_at", // Map to the custom column name
      updatedAt: "updated_at", // Map to the custom column name
    }
  );

  return UserMetadata;
};
