const User = require("../models/user");
const signToken = require("../utils/jwt-util");
const frontend = process.env.FRONTEND_URL;

const googleOauth = async (req, res, next) => {
  try {
    const gUser = req.user;
    if (!gUser) {
      const error = new Error("error in google user data fetching try again");
      error.status = 404;
      throw error;
    }
    const existingUser = await User.findOne({
      $or: [{ email: gUser.emails[0].values }, { googleId: gUser.id }],
    });
    let token;
    if (!existingUser) {
      const newUser = await User.create({
        email: gUser.emails[0].values,
        name: gUser.displayName,
        googleId: gUser.id,
        avatar: gUser.photos[0].value,
      });
      token = signToken(newUser.email, newUser._id);
    } else {
      token = signToken(existingUser.email, existingUser._id);
    }
    res.cookie("token", token, { path: "/" });
    res.redirect(`${frontend}/products`);
    return;
  } catch (error) {
    next(error);
  }
};

const getUser = async (req, res, next) => {
  try {
    const user = req.user;
    const existingUser = await User.findById(user.id);
    if (!existingUser) {
      let error = new Error("User info not found");
      error.status = 400;
      throw error;
    }
    res.status(200).json({
      success: true,
      user: user,
    });
  } catch (error) {
    next(error);
  }
};

const logOut = async (req, res, next) => {
  try {
    res.clearCookie("token", {
      path: "/", // must match
      httpOnly: true, // same as when set
      sameSite: "lax", // or whatever you used
      secure: process.env.NODE_ENV === "production",
    });
    res.redirect(`${frontend}/login`);
  } catch (error) {
    next(error);
  }
};
module.exports = { googleOauth, getUser, logOut };
