module.exports = (sequelize, DataTypes) => {
  const Slugs = sequelize.define("slugs", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
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
  });

  return Slugs;
};
