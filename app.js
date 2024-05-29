const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

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

app.listen(8080);
