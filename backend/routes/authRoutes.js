const Router = require("express");
const passport = require("passport");
const {
  googleOauth,
  getUser,
  logOut,
} = require("../controllers/authController");
const verifyToken = require("../middlewares/Jwt_middlewares");

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  googleOauth
);

authRouter.post("/logout", verifyToken, logOut);

authRouter.get("/user", verifyToken, getUser);

module.exports = authRouter;
