const CategoryRouter = require("express").Router();
const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getAllCategoriesRestaurant,
} = require("../Controllers/categories.controller");

CategoryRouter.route("/").post(createCategory).get(getAllCategories);

CategoryRouter.route("/:id")
  .get(getCategoryById)
  .patch(updateCategory)
  .delete(deleteCategory);

CategoryRouter.route("/business/:id").get(getAllCategoriesRestaurant);

module.exports = CategoryRouter;
