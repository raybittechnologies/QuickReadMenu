const { catchAsync } = require("../Utils/catchAsync");

const { Business, Categories, Items } = require("../Models/index");

// Create a new Business
exports.createBusiness = catchAsync(async (req, res, next) => {
  req.body = { ...req.body, ...req.uploadedFiles };
  const newBuisness = await Business.create(req.body);
  res.status(201).json({ status: "success", data: newBuisness });
});

// Get all Businesses
exports.getAllBusinesses = catchAsync(async (req, res, next) => {
  const allBusinesses = await Business.findAll();
  res.status(200).json({ status: "success", data: allBusinesses });
});

// Get a single Business by ID
exports.getBusinessById = catchAsync(async (req, res, next) => {
  const single = await Business.findByPk(req.params.id);
  if (!Business) {
    return res
      .status(404)
      .json({ status: "fail", message: "Business not found" });
  }
  res.status(200).json({ status: "success", data: single });
});

// Update a Business
exports.updateBusiness = catchAsync(async (req, res, next) => {
  const update = await Business.findByPk(req.params.id);

  if (!update) {
    return res
      .status(404)
      .json({ status: "fail", message: "Business not found" });
  }
  req.body = { ...req.body, ...req.uploadedFiles };
  await update.update(req.body);

  res.status(200).json({ status: "success", data: update });
});

// Delete a Business
exports.deleteBusiness = catchAsync(async (req, res, next) => {
  const toBeDeleted = await Business.findByPk(req.params.id);
  if (!toBeDeleted) {
    return res
      .status(404)
      .json({ status: "fail", message: "Business not found" });
  }
  await toBeDeleted.destroy();
  res.status(204).json({ status: "success", data: null });
});

exports.getMenu = catchAsync(async (req, res, next) => {
  // const Menu = await Business.findByPk(req.params.id, {
  //   include: [{ model: Categories, include: [{ model: Items }] }],
  // });
  const Menu = await Business.findByPk(req.params.id, {
    include: [
      {
        model: Categories,
        include: [
          {
            model: Items,
          },
        ],
      },
    ],
  });

  res.status(200).json({ status: "success", data: Menu });
});
