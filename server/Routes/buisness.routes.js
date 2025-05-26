const BusinessRouter = require("express").Router();
const path = require("path");
const multer = require("multer");
const {
  createBusiness,
  getAllBusinesses,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  getMenu,
  getMyQr,
  getMenuOnSlug,
  published,
} = require("../Controllers/buisnesses.controller");
const { protect } = require("../Controllers/auth.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let folder = "";

    if (file.fieldname === "logo") folder = "logos";
    else if (file.fieldname === "banner") folder = "banners";
    else return cb(new Error("Invalid file field"), null);

    const uploadPath = path.join(__dirname, `../public/assets/${folder}`);

    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    const filename = `${file.fieldname}-${uniqueSuffix}${ext}`;

    // Store file path relative to /public for use later
    if (!req.uploadedFiles) req.uploadedFiles = {};
    req.uploadedFiles[file.fieldname] = `/${file.fieldname}s/${filename}`;

    cb(null, filename);
  },
});
const upload = multer({ storage });

BusinessRouter.use(protect);

BusinessRouter.route("/")
  .post(
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    createBusiness
  )
  .get(getAllBusinesses);

BusinessRouter.route("business/:id")
  .get(getBusinessById)
  .patch(
    upload.fields([
      { name: "logo", maxCount: 1 },
      { name: "banner", maxCount: 1 },
    ]),
    updateBusiness
  )
  .delete(deleteBusiness);

BusinessRouter.route("/menu/:id").get(getMenu);
BusinessRouter.get("/getMyQr", getMyQr);
BusinessRouter.get("/qr/:slug", getMenuOnSlug);
BusinessRouter.get("/publish/:id", published);

module.exports = BusinessRouter;
