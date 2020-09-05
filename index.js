const express           = require("express");
const mongoose          = require("mongoose");
const bodyParser        = require("body-parser");
const expressSanitizer  = require("express-sanitizer");
const methodOverride    = require("method-override");
const passport          = require("passport");
const LocalStrategy     = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");

require('dotenv').config();

const app           = express();
const PORT          = process.env.PORT || 5000;
const DBURL         = process.env.DATABASEURL || "mongodb://localhost/movies-db";
const Movie         = require("./models/movie");
const Comment       = require("./models/comment");
const User          = require("./models/user");
const movieRoutes   = require("./routes/movies");
const commentRoutes = require("./routes/comments");
const indexRoutes   = require("./routes/index");
const searchRoutes  = require("./routes/searchfast");
const profileRoutes  = require("./routes/profile");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSanitizer());
app.use(methodOverride("_method"));
mongoose.connect(DBURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(function() { console.log(`connected to database...`) })
  .catch(function(err) { console.log(`not connected to database`, err) });

app.use(require("express-session")({
  secret: "They will submit to power of your will",
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// ADD REQ.USER TO ALL ROUTES
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

// Listener
app.listen(PORT, () => console.log(`server is on port ${PORT}`));