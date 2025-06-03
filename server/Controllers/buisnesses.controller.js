const { catchAsync } = require("../Utils/catchAsync");
const { sequelize } = require("../Models/index");
var QRCode = require("qrcode");
const path = require("path");

const { Business, Categories, Items, Slugs } = require("../Models/index");
const { default: slugify } = require("slugify");
const { or, where } = require("sequelize");
const { create } = require("domain");

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
    // req.body.user_id = "96cb1341-5677-469b-a2d8-e90b03efbbf6";
    req.body.user_id = req.user.id;

    const newBusiness = await Business.create(req.body, { transaction: t });

    const qr = QRCode.toFile(
      `${location}`,
      `${process.env.FE_URL}/${businessSlug}`,
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
      { slug: `/${businessSlug}`, business_id: newBusiness.id },
      { transaction: t }
    );

    for (const categoryName of req.body.categories) {
      const category = await Categories.create(
        {
          name: categoryName,
          business_id: newBusiness.id,
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

    return { newBusiness, businessSlug };
  });

  if (!operation) return res.status(400).json({ status: "error" });

  res.status(201).json({ status: "success", data: result.newBusiness });
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
  const { id } = req.user;
  // let id = "96cb1341-5677-469b-a2d8-e90b03efbbf6";
  const myQr = await Slugs.findOne({
    attributes: ["slug", "business_id"],
    order: [["createdAt", "DESC"]],
    include: [
      {
        model: Business,
        attributes: ["qrcode", "is_published"],
        where: { user_id: id },
      },
    ],
  });
  console.log(myQr);

  res.status(200).json(myQr);
});

exports.getMenuOnSlug = catchAsync(async (req, res, next) => {
  const slug = `/${req.params.slug}`;
  console.log(slug);

  const myQrMenu = await Slugs.findOne({
    where: { slug },
    attributes: ["slug", "business_id"],
    include: [
      {
        model: Business,
        attributes: [
          "is_published",
          "qrcode",
          "logo",
          "banner",
          "businessName",
        ],
        include: {
          model: Categories,
          include: {
            model: Items,
          },
        },
      },
    ],
  });
  console.log(myQrMenu);

  if (!myQrMenu) {
    return res.status(404).json({ message: "Menu not found" });
  }
  const published = myQrMenu.business;

  if (published.is_published) {
    return res.json(myQrMenu);
  } else {
    return res.json({
      business: {
        businessName: published.businessName,
        logo: published.logo,
      },
    });
  }
});

exports.published = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const publish = await Business.update(
    {
      is_published: true,
    },
    { where: { id } }
  );
  res.status(200).json(publish);
});
