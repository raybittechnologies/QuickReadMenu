module.exports = (db) => {
  //Business
  db.Business.hasMany(db.Categories, {
    foreignKey: { name: "business_id" },
  });

  db.Business.hasMany(db.Slugs, { foreignKey: { name: "business_id" } });
  db.Slugs.belongsTo(db.Business, { foreignKey: { name: "business_id" } });

  db.User.hasMany(db.Business, {
    foreignKey: { name: "user_id" },
  });
  db.Business.belongsTo(db.User, {
    foreignKey: { name: "user_id" },
  });

  //Categories
  db.Categories.belongsTo(db.Business, {
    foreignKey: { name: "business_id" },
  });

  db.Categories.hasMany(db.Items, {
    foreignKey: { name: "category_id" },
  });

  //Items
  db.Items.belongsTo(db.Categories, {
    foreignKey: { name: "category_id" },
  });

  //Slugs
};
