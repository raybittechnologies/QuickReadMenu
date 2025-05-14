module.exports = (db) => {
  //Business
  db.Business.hasMany(db.Categories, {
    foreignKey: { name: "business_id" },
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
};
