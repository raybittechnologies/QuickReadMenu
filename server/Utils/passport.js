const fs = require("fs");
const jwt = require("jsonwebtoken");

const GoogleStrategy = require("passport-google-oauth20").Strategy;

// Google OAuth Strategy
exports.initializeStratigies = (passport) => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: `${process.env.BE_URL}/api/v1/auth/gCallback`,
      },
      (accessToken, refreshToken, profile, done) => {
        const user = {
          email: profile.emails[0].value,
          name: profile.displayName,
          googleId: profile.id,
          provider: "google",
          profilePicture: profile._json.picture,
        };
        done(null, user);
      }
    )
  );

  // Serialize/deserialize user (for session management)
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => done(null, user));
};
