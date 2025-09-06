const Router = require("express");
const passport = require("passport");
const { googleOauth, getUser } = require("../controllers/authController");
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

authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

authRouter.get("/user", verifyToken, getUser);

module.exports = authRouter;
