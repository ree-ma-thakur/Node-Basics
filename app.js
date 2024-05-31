const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
const errorController = require("./controllers/error");

app.set("view engine", "ejs"); // templating engine
app.set("views", "views"); // views folder for TE views

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // This allows us to get public css file in shop.html

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user; // sequelize object is stored in request which have all methods like destroy etc
      next();
    })
    .catch((err) => console.log(err));
});

app.use("/admin", adminRoutes); // filtering segment
app.use(shopRoutes);

// for 404 request
app.use(errorController.get404);

// Before sequelize sync, we relate models
Product.belongsTo(User, { constraints: true, onDelete: "CASCADE" }); // Cascade means if user is deleted then any products related to user will also be gone
User.hasMany(Product);

// We make sure that when our app starts then all the models get created in our DB
sequelize
  // .sync({ force: true }) // force true to reflect the model changes after the creation of table -> it will always overwrite the tables
  .sync()
  .then((result) => {
    return User.findByPk(1); // if we have user by id 1, then ok, otherwise new user will be created
  })
  .then((user) => {
    if (!user) {
      User.create({ name: "Reema", email: "reema@test.com" }); // return promise
    }
    return user; //it will not promise so we have to make it, but value returned in then block is always Promise
  })
  .then((user) => {
    app.listen(8080);
  })
  .catch((err) => console.log(err));
