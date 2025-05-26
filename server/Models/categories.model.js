module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define(
    "Categories",
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      business_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "businesses",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
    },
    { indexes: [{ unique: true, fields: ["business_id", "name"] }] }
  );

  return Categories;
};
