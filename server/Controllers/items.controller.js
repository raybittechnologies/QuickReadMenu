const { Items, Categories } = require("../Models/index");
const { catchAsync } = require("../Utils/catchAsync");

// Create a new item
exports.createItem = catchAsync(async (req, res, next) => {
  const item = await Items.create(req.body);

  const { dataValues } = await item.getCategory();

  res.status(201).json({ status: "success", [dataValues["name"]]: item });
});

// Get all items
exports.getAllItems = catchAsync(async (req, res, next) => {
  const items = await Items.findAll();
  res.status(200).json({ status: "success", data: items });
});

// Get a single item by ID
exports.getItemById = catchAsync(async (req, res, next) => {
  const item = await Items.findByPk(req.params.id);
  if (!item) {
    return res.status(404).json({ status: "fail", message: "Item not found" });
  }
  res.status(200).json({ status: "success", data: item });
});

// Update an item
exports.updateItem = catchAsync(async (req, res, next) => {
  const item = await Items.findByPk(req.params.id);
  if (!item) {
    return res.status(404).json({ status: "fail", message: "Item not found" });
  }
  await item.update(req.body);
  res.status(200).json({ status: "success", data: item });
});

// Delete an item
exports.deleteItem = catchAsync(async (req, res, next) => {
  const item = await Items.findByPk(req.params.id);
  if (!item) {
    return res.status(404).json({ status: "fail", message: "Item not found" });
  }
  await item.destroy();
  res.status(204).json({ status: "success", data: null });
});

exports.getItemsByCategory = catchAsync(async (req, res, next) => {
  const categories = await Categories.findAll({
    where: { business_id: req.params.id },
    attributes: ["id", "name"],
    include: {
      model: Items,
      as: "Items",
      attributes: ["id", "name", "description", "price"],
    },
  });
  res.status(200).json({ status: "success", data: categories });
});
