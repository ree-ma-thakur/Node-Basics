const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const app = express();
const expressHbs = require("express-handlebars");

const adminData = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.engine(
  "hbs",
  expressHbs({
    layoutDir: "views/layouts/",
    defaultLayout: "main-layout",
    extname: "hbs",
  })
); // expressHbs initalised; we can use any name like hbs or handlebars but then file extension should also we hbs or handlebars; we have to add common layout here & tell the extension name also
app.set("view engine", "hbs"); // templating engine
app.set("views", "views"); // views folder for TE views

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // This allows us to get public css file in shop.html

app.use("/admin", adminData.routes); // filtering segment
app.use(shopRoutes);

// for 404 request
app.use((req, res, next) => {
  res.status(404).render("404", { pageTitle: "Page Not Found" });
});

app.listen(8080);
