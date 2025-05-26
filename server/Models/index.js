const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
    logging: false,
  }
);

const db = {};
const associations = require("./Associations/index");
db.sequelize = sequelize;
db.Business = require("./businessesModel")(sequelize, DataTypes);
db.Categories = require("./categories.model")(sequelize, DataTypes);
db.Items = require("./items.model")(sequelize, DataTypes);
db.Slugs = require("./slugs.model")(sequelize, DataTypes);
db.User = require("./users.model")(sequelize, DataTypes);

associations(db);

(async () => {
  try {
    await sequelize.authenticate();
    // await sequelize.sync({ force: true });
    // await db.Business.sync({ alter: true });
    console.log("DB Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
})();

module.exports = db;
