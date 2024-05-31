const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const sequelize = require("./util/database");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.set("view engine", "ejs"); // templating engine
app.set("views", "views"); // views folder for TE views

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // This allows us to get public css file in shop.html

app.use("/admin", adminRoutes); // filtering segment
app.use(shopRoutes);

// for 404 request
app.use(errorController.get404);

// We make sure that when our app starts then all the models get created in our DB
sequelize
  .sync()
  .then((result) => {
    console.log(result);
    app.listen(8080);
  })
  .catch((err) => console.log(err));
