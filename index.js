require('dotenv').config();

// Import packages
const express           = require("express");
const mongoose          = require("mongoose");
const fetch             = require("node-fetch");
const expressSanitizer  = require("express-sanitizer");
const methodOverride    = require("method-override");
const passport          = require("passport");
const LocalStrategy     = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// Global functions
const { getcookies, getLocale } = require("./functions/global");

// Import routes
const movieRoutes   = require("./routes/movies");
const commentRoutes = require("./routes/comments");
const indexRoutes   = require("./routes/index");
const searchRoutes  = require("./routes/searchfast");
const profileRoutes = require("./routes/profile");
const apiproxyRoutes = require("./routes/apiproxy");
const infoRoutes    = require("./routes/info");

const app           = express();
const PORT          = process.env.PORT || 5800;
const DBURL         = process.env.DATABASEURL || "mongodb://localhost/movies-db";
const Movie         = require("./models/movie");
const Comment       = require("./models/comment");
const User          = require("./models/user");
const Inquiry       = require("./models/contact_form");


app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(expressSanitizer());
app.use(methodOverride("_method"));
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => { console.log(`connected to database...`) })
  .catch((err) => { console.log(`not connected to database`, err) });

app.use(require("express-session")({
  secret: "Have fun watching all these wonderful moveiz",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(getcookies);
app.use(getLocale);

// Add user to all routes (req.user)
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.gCaptchaKey = process.env.CAPTCHA_SITE_KEY;
  next();
});

// Routes Config
app.use("/movies", movieRoutes);
app.use("/api", apiproxyRoutes);
app.use("/movies/:id/comments", commentRoutes);
app.use(indexRoutes);
// app.use(searchRoutes);
app.use(profileRoutes);
app.use("/info", infoRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
