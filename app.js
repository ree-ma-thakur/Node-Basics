const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const errorController = require("./controllers/error");
const User = require("./models/user");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

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

app.use(errorController.get404);

mongoose
  .connect(
    "mongodb+srv://reemathakur0214:Noderoot%40123@cluster0.n4dgexg.mongodb.net/shop?retryWrites=true&w=majority&appName=Cluster0"
  )
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
