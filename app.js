const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDBStore = require("connect-mongodb-session")(session);
const csrf = require("csurf");
const flash = require("connect-flash");
const multer = require("multer");

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://reemathakur0214:Noderoot%40123@cluster0.n4dgexg.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const store = new MongoDBStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

const csrfProtection = csrf({});

// diskStorage is storage engine for multer, takes obj having  2 keys destination(regarding storing path) & filename
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // null is for error msg, images is folder
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString() + "-" + file.originalname); // error null, filename we want to add in folder
  },
});

// to filter the file types
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true); // true if we  want to store the file
  } else {
    cb(null, false); // false, if we don't want to store the file
  }
};

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(
  multer({ storage: fileStorage, fileFilter: fileFilter }).single("image")
); // exprect one file; image is the input name in view; dest is tha path to store the image
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
); // secret to setup signing hash that will secretly store id, resave false means session will not be saved on every response that is sent but only when something is changed in session; saveUninitialized false means no session is saved for request; we can also configure cookie in this; it automatically adds some cookies BTS

// After initialising the session add csrf
app.use(csrfProtection);

app.use(flash()); // Now we can use flash anywhere on the request obj

app.use((req, res, next) => {
  // for every request execution these fields will be set for views
  res.locals.isAuthenticated = req.session.isLoggedIn;
  res.locals.csrfToken = req.csrfToken();
  next();
});

app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }
  User.findById(req.session.user._id)
    .then((user) => {
      if (!user) {
        return next();
      }
      req.user = user;
      next();
    })
    .catch((err) => {
      next(new Error(err));
    });
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use("/500", errorController.get500);

app.use(errorController.get404);

// express detect this as special middleware & move to this error handling middleware when we call next(error)
app.use((error, req, res, next) => {
  // res.redirect("/500");
  res.status(500).render("500", {
    pageTitle: "Error!",
    path: "/500",
    isAuthenticated: req.session.isLoggedIn,
  });
});

mongoose
  .connect(MONGODB_URI)
  .then((result) => {
    console.log("Connected to DB");
    app.listen(8080);
  })
  .catch((err) => {
    console.log(err);
  });
