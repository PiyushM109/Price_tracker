const Router = require("express");
const passport = require("passport");

const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    // Successful authentication, redirect to home
    res.redirect("http://localhost:5173/products");
  }
);

authRouter.get("/logout", (req, res) => {
  req.logout(() => {
    res.redirect("/");
  });
});

authRouter.get("/user", (req, res) => {
  if (req.user) {
    res.send(req.user);
  } else {
    res.status(401).send({ message: "Not authenticated" });
  }
});

module.exports = authRouter;
