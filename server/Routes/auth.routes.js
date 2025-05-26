const AuthRouter = require("express").Router();
const {
  googleSignUp,
  googleCallback,
  signUp,
  login,
} = require("../Controllers/auth.controller");

AuthRouter.route("/signup").post(signUp);
AuthRouter.route("/login").get(login);
AuthRouter.route("/google/signup").get(googleSignUp);
AuthRouter.get("/gCallback", googleCallback);
module.exports = AuthRouter;
