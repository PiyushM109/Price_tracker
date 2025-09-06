const express = require("express");
require("dotenv").config();
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/authRoutes.js");
const dataRouter = require("./routes/dataRoutes.js");
const connectDb = require("./config/db.config.js");
const errorHandler = require("./middlewares/errorHandler.js");
require("./config/Oauth.config.js");

const app = express();

// Configure CORS to allow credentials
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());

// Session configuration
app.use(
  session({
    secret: process.env.SESSION_SECRET || "fallback_secret_key_for_development",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    }, // 24 hours
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/data", dataRouter);

// cron.schedule("*/2 * * * *", updater);

// updater();
app.use(errorHandler);
const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
  await connectDb();
  console.log(`server is running on port ${PORT}`);
});
