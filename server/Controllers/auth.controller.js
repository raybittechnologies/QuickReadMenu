const { catchAsync } = require("../Utils/catchAsync");

const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { User } = require("../Models");
const passport = require("passport");

const createSendToken = async (res, req, data) => {
  const tokenOptions = { expiresIn: process.env.JWT_EXPIRY };
  const token = jwt.sign({ data }, process.env.JWT_SECRET, tokenOptions);

  const cookieOptions = {
    expires: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    sameSite: "none",
    // secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    secure: true,
  };

  res.cookie("JWT", token, cookieOptions);
  return token;
};

const getTokenData = (req) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.JWT) token = req.cookies.JWT;

  if (!token) {
    return null;
  }
  const data = jwt.verify(token, process.env.JWT_SECRET);
  return data;
};

const changePasswordToken = () => {
  let token = crypto.randomBytes(32).toString("hex");
  const passwordResetToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const passwordResetTokenExpires = new Date(Date.now() + 10 * 60 * 1000);

  return { passwordResetToken, passwordResetTokenExpires };
};

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(404).json({ message: "Provide all inputs" });
  }

  const response = await User.findOne({
    where: { email },
  });

  if (!response) return res.status(404).json({ message: "User not found" });

  if (!response.isActive)
    return res.status(404).json({ message: "User is not active" });

  const isPasswordValid = await response.checkPassword(password);

  if (!isPasswordValid) {
    return res.status(404).json({ message: "Invalid credentials" });
  }
  const token = await createSendToken(res, req, email);

  res.status(200).json({
    status: "Success",
    user: response,
    token,
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const tokenUser = getTokenData(req);

  if (!tokenUser) return res.status(401).json({ message: "Unauthorized" });

  const users = await User.findOne({
    where: { email: tokenUser.data },
  });

  req.user = {
    id: users.id,
    email: users.email,
  };
  next();
});

exports.signUp = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  await User.create({ email, password });

  successResponse(res, "SignUp successfull", { email, password });
});

exports.googleSignUp = (req, res, next) =>
  passport.authenticate("google", {
    scope: ["email"],
  })(req, res, next);

exports.googleCallback = catchAsync(async (req, res, next) => {
  passport.authenticate(
    "google",
    { session: false },
    async (err, user, info) => {
      if (err || !user) {
        return res.redirect("/");
      }

      const dbUser = await User.findOne({
        where: {
          email: user.email,
        },
      });

      if (dbUser) {
        const token = await createSendToken(res, req, {
          email: user.email,
        });

        return res.redirect(`${process.env.FE_URL}/agreement?token=${token}`);
      }

      await User.create({
        email: user.email,
        googleId: user.googleId,
      });

      const token = await createSendToken(res, req, {
        email: user.email,
      });

      res.redirect(`${process.env.FE_URL}/agreement?token=${token}`);
    }
  )(req, res, next);
});

exports.forgetPassword = catchAsync(async (req, res, next) => {
  const { username } = req.body;

  if (!username) return next(new AppError(401, "Provide your username"));

  const users = await user.findOne({ where: { username } });

  if (!users) {
    return next(new AppError(401, "No user found with this username"));
  }
  const resetToken = changePasswordToken();

  await user.update(
    {
      password_reset_token: resetToken.passwordResetToken,
      password_reset_expiry: resetToken.passwordResetTokenExpires,
    },
    {
      where: { username },
    }
  );
  const token = resetToken.passwordResetToken;

  const resetUrl = `${process.env.FRONTEND_URL}/resetPassword/${token}`;

  new Email(users.email, resetUrl).sendPasswordReset();

  successResponse(res, "password reset link has been sent to your email ");
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const { token } = req.params;
  const { password, confirmPassword } = req.body;

  if (!password || !confirmPassword)
    return next(new AppError(401, "provide all inputs "));

  if (password !== confirmPassword)
    return next(
      new AppError(401, "password and confirm password does not match ")
    );

  const users = await user.findOne({
    where: {
      password_reset_token: token,
      password_reset_expiry: {
        [Op.gt]: new Date(),
      },
    },
  });

  if (!users)
    if (!users) return next(new AppError(401, "No user with this username "));

  users.password = password;
  await users.save();

  successResponse(res, "password has been updated ");
});

exports.logout = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  )
    token = req.headers.authorization.split(" ")[1];
  else if (req.cookies.JWT) token = req.cookies.JWT;

  const cookies = token;

  if (!cookies) return next(new AppError(400, "No logged in User found!"));

  const cookieOptions = {
    expires: new Date(Date.now() + 1000),
    httpOnly: true,
    sameSite: "none",
    secure: req.secure || req.headers["x-forwarded-proto"] === "https",
    // secure: true,
  };

  res.cookie("JWT", "Your session is about to expire!", cookieOptions);

  res.status(200).json({
    status: "Success",
    message: "You have been logged out!",
  });
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  const { password, newPassword, passwordConfirm } = req.body;

  if (!password || !newPassword || !passwordConfirm)
    return next(new AppError(401, "Provide password and confirm password"));

  if (newPassword !== passwordConfirm) {
    return next(new AppError(401, "passwords does not match"));
  }

  let exsitingUser = await User.findOne({ where: { email: req.user.email } });

  const isPasswordValid = await exsitingUser.checkPassword(password);
  if (!isPasswordValid)
    return next(new AppError(401, "Old password Incorrect"));

  exsitingUser.password = newPassword;
  await exsitingUser.save();

  res.status(200).json({
    status: "Success",
    exsitingUser,
  });
});
