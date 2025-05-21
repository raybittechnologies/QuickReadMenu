const AuthRouter = require("express").Router();
const {
  googleSignUp,
  googleCallback,
} = require("../Controllers/auth.controller");

AuthRouter.route("/google/signup").get(googleSignUp);
AuthRouter.get("/gCallback", googleCallback);
module.exports = AuthRouter;
