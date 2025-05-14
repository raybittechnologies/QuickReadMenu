const CategoryRouter = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require("../Controllers/categories.controller");

CategoryRouter.route("/").post(createCategory).get(getAllCategories);

CategoryRouter.route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

module.exports = CategoryRouter;
