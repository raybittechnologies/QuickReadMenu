module.exports = (sequelize, DataTypes) => {
  const Business = sequelize.define("buisnesses", {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    businessName: {
      type: DataTypes.STRING,
    },
    businesstype: {
      type: DataTypes.STRING,
    },
    country: {
      type: DataTypes.STRING,
    },
    language: {
      type: DataTypes.STRING,
      defaultValue: "english",
    },
    adderess: {
      type: DataTypes.STRING,
    },
    add_city: {
      type: DataTypes.STRING,
    },
    add_country: {
      type: DataTypes.STRING,
    },
    add_zip: {
      type: DataTypes.STRING,
    },
    add_pnone: {
      type: DataTypes.STRING,
    },
    logo: {
      type: DataTypes.STRING,
    },
    banner: {
      type: DataTypes.STRING,
    },
    qrcode: {
      type: DataTypes.STRING,
    },
  });

  return Business;
};
