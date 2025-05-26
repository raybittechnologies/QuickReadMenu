const ItemRouter = require("express").Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
  getItemsByCategory,
} = require("../Controllers/items.controller");

ItemRouter.route("/").post(createItem).get(getAllItems).get(getItemsByCategory);
ItemRouter.route("/category/:id").get(getItemsByCategory);

ItemRouter.route("/:id").get(getItemById).patch(updateItem).delete(deleteItem);

module.exports = ItemRouter;
