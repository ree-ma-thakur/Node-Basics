const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.set("view engine", "ejs"); // templating engine
app.set("views", "views"); // views folder for TE views

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // This allows us to get public css file in shop.html

app.use("/admin", adminData.routes); // filtering segment
app.use(shopRoutes);

// for 404 request
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found", path: "" });
});

app.listen(8080);
