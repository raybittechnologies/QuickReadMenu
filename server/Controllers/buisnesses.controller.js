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
  console.log(req.body);
  const result = await sequelize.transaction(async (t) => {
    const businessSlug = slugify(req.body.businessName);
    fileName = `${Date.now()}-${businessSlug}`;
    const location = path.join(
      __dirname,
      `../public/assets/qrcodes/${fileName}.png`
    );

    req.body.qrcode = `/qrcodes/${fileName}.png`;
    req.body.user_id = "b5f9638b-5768-4a22-b36a-1533e3934d40";
    const newBuisness = await Business.create(req.body, { transaction: t });

    const qr = QRCode.toFile(
      `${location}`,
      `${process.env.SERVER_URI}/${businessSlug}`,
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
      { slug: `/${businessSlug}`, buisness_id: newBuisness.id },
      { transaction: t }
    );

    for (const categoryName of req.body.categories) {
      const category = await Categories.create(
        {
          name: categoryName,
          business_id: newBuisness.id,
        },
        { transaction: t }
      );

      const items = req.body.items[categoryName];

      for (const item of items) {
        await Items.create(
          {
            name: item.name,
            price: item.price,
            description: item.description,
            category_id: category.id,
          },
          { transaction: t }
        );
      }
    }

    return { newBuisness, businessSlug };
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
  if (!single) {
    return res
      .status(404)
      .json({ status: "fail", message: "Business not found" });
  }
  res.status(200).json({ status: "success", data: single });
});

exports.getMyBusiness = catchAsync(async (req, res, next) => {
  const single = await Business.findOne({ where: { user_id: req.user.id } });
  if (!single) {
    return res
      .status(404)
      .json({ status: "fail", message: "Business not found" });
  }
  res.status(200).json({ status: "success", data: single });
});

// Update a Business
exports.updateBusiness = catchAsync(async (req, res, next) => {
  const update = await Business.findOne({ where: { user_id: req.user.id } });

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
        attributes: ["qrcode", "logo", "banner", "businessName"],
        include: { model: Categories, include: { model: Items } },
      },
    ],
  });

  const menu = myQrMenu.buisness;
  res.status(200).json({ status: "success", menu });
});
