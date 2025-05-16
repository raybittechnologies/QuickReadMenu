const { catchAsync } = require("../Utils/catchAsync");
const { sequelize } = require("../Models/index");
var QRCode = require("qrcode");
const path = require("path");

const { Business, Categories, Items, Slugs } = require("../Models/index");
const { default: slugify } = require("slugify");

// Create a new Business
exports.createBusiness = catchAsync(async (req, res, next) => {
  req.body = { ...req.body, ...req.uploadedFiles };
  let operation = true;
  let fileName;
  const result = await sequelize.transaction(async (t) => {
    const buisnessSlug = slugify(req.body.buisnessName);
    fileName = `${Date.now()}-${buisnessSlug}`;
    const location = path.join(
      __dirname,
      `../public/assets/qrcodes/${fileName}.png`
    );

    req.body.qrcode = `/qrcodes/${fileName}.png`;
    const newBuisness = await Business.create(req.body, { transaction: t });

    const qr = QRCode.toFile(
      `${location}`,
      `${process.env.SERVER_URI}/${buisnessSlug}`,
      {
        type: "png",
        color: {
          dark: "#000000",
          light: "#ffffff",
        },
      },
      function (err) {
        if (err) {
          t.rollback();
          operation = false;
        }
      }
    );

    if (!operation) return;

    await Slugs.create(
      { slug: `/${buisnessSlug}`, buisness_id: newBuisness.id },
      { transaction: t }
    );

    return { newBuisness, buisnessSlug };
  });

  if (!operation) return res.status(400).json({ status: "error" });

  res.status(201).json({ status: "success", data: result.newBuisness });
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

exports.getMyQr = catchAsync(async (req, res, next) => {
  const slug = `/${req.params.slug}`;

  const myQr = await Slugs.findOne({
    where: { slug },
    include: [{ model: Business, attributes: ["qrcode"] }],
  });

  res.status(200).json(myQr);
});

exports.getMenuOnSlug = catchAsync(async (req, res, next) => {
  const slug = `/${req.params.slug}`;

  const myQrMenu = await Slugs.findOne({
    where: { slug },
    include: [
      {
        model: Business,
        attributes: ["qrcode"],
        include: { model: Categories, include: { model: Items } },
      },
    ],
  });

  const menu = myQrMenu.res.status(200).json({ status: "success", myQrMenu });
});
