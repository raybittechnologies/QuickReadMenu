module.exports = (sequelize, DataTypes) => {
  const Items = sequelize.define(
    "Items",
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
      category_id: {
        type: DataTypes.UUID,
        allowNull: false,
        references: {
          model: "Categories",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },
    },
    { indexes: [{ unique: true, fields: ["category_id", "name"] }] }
  );

  return Items;
};
