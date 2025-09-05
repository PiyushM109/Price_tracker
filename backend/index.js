const express = require("express");
const cors = require("cors");
const session = require("express-session");
const passport = require("passport");
const authRouter = require("./routes/authRoutes.js");
const dataRouter = require("./routes/dataRoutes.js");
const connectDb = require("./config/db.config.js");
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
    cookie: { secure: false, maxAge: 24 * 60 * 60 * 1000 }, // 24 hours
  })
);

// Passport configuration
app.use(passport.initialize());
app.use(passport.session());
app.use("/auth", authRouter);
app.use("/data", dataRouter);

// Authentication routes

// cron.schedule("*/2 * * * *", updater);

// updater();

app.listen(3000, async () => {
  await connectDb();
  console.log(`server is running on port 3000`);
});
