const { Categories } = require("../Models/index");
const { catchAsync } = require("../Utils/catchAsync");

// Create a new category
exports.createCategory = catchAsync(async (req, res, next) => {
  const category = await Categories.create(req.body);
  res.status(201).json({ status: "success", data: category });
});

// Get all categories
exports.getAllCategories = catchAsync(async (req, res, next) => {
  const categories = await Categories.findAll();
  res.status(200).json({ status: "success", data: categories });
});

// Get a single category by ID
exports.getCategoryById = catchAsync(async (req, res, next) => {
  const category = await Categories.findByPk(req.params.id);
  if (!category) {
    return res
      .status(404)
      .json({ status: "fail", message: "Category not found" });
  }
  res.status(200).json({ status: "success", data: category });
});

// Update a category
exports.updateCategory = catchAsync(async (req, res, next) => {
  const category = await Categories.findByPk(req.params.id);
  if (!category) {
    return res
      .status(404)
      .json({ status: "fail", message: "Category not found" });
  }
  await category.update(req.body);
  res.status(200).json({ status: "success", data: category });
});

// Delete a category
exports.deleteCategory = catchAsync(async (req, res, next) => {
  const category = await Categories.findByPk(req.params.id);
  if (!category) {
    return res
      .status(404)
      .json({ status: "fail", message: "Category not found" });
  }
  await category.destroy();
  res.status(204).json({ status: "success", data: null });
});
