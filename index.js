// Import packages
const express           = require("express");
const mongoose          = require("mongoose");
const bodyParser        = require("body-parser");
const expressSanitizer  = require("express-sanitizer");
const methodOverride    = require("method-override");
const passport          = require("passport");
const LocalStrategy     = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

// Import routes
const movieRoutes   = require("./routes/movies");
const commentRoutes = require("./routes/comments");
const indexRoutes   = require("./routes/index");
const searchRoutes  = require("./routes/searchfast");
const profileRoutes  = require("./routes/profile");

const app           = express();
const PORT          = process.env.PORT || 5800;
const DBURL         = process.env.DATABASEURL || "mongodb://localhost/movies-db";
const Movie         = require("./models/movie");
const Comment       = require("./models/comment");
const User          = require("./models/user");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));
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

// Add user to all routes (req.user)
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
});

// Routes Config
app.use("/movies", movieRoutes);
app.use("/movies/:id/comments", commentRoutes);
app.use(indexRoutes);
app.use(searchRoutes);
app.use(profileRoutes);

// Server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
