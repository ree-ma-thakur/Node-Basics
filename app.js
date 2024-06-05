const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const session = require("express-session");
const MongoDbStore = require("connect-mongodb-session")(session); // In this we pass our above session

const errorController = require("./controllers/error");
const User = require("./models/user");

const MONGODB_URI =
  "mongodb+srv://reemathakur0214:Noderoot%40123@cluster0.n4dgexg.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0";

const app = express();
const store = new MongoDbStore({
  uri: MONGODB_URI,
  collection: "sessions",
});

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const authRoutes = require("./routes/auth");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use(
  session({
    secret: "my-secret",
    resave: false,
    saveUninitialized: false,
    store,
  })
); // secret to setup signing hash that will secretly store id, resave false means session will not be saved on every response that is sent but only when something is changed in session; saveUninitialized false means no session is saved for request; we can also configure cookie in this

app.use((req, res, next) => {
  User.findById("665e6de614badb4c3b17d3ce")
    .then((user) => {
      req.user = user;
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404);

mongoose
  .connect(MONGODB_URI)
  .then(() => {
    console.log("Connected to DB");
    User.findOne().then((user) => {
      if (!user) {
        const userObj = new User({
          name: "Reema",
          email: "reema@test.com",
          cart: { items: [] },
        });
        userObj.save();
      }
    });
    app.listen(8080);
  })
  .catch((err) => console.log(err));
