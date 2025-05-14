const ItemRouter = require("express").Router();
const {
  createItem,
  getAllItems,
  getItemById,
  updateItem,
  deleteItem,
} = require("../Controllers/items.controller");

ItemRouter.route("/").post(createItem).get(getAllItems);

ItemRouter.route("/:id").get(getItemById).patch(updateItem).delete(deleteItem);

module.exports = ItemRouter;
