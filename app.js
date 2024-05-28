const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public"))); // This allows us to get public css file in shop.html

app.use("/admin", adminRoutes); // filtering segment
app.use(shopRoutes);

// for 404 request
app.use((req, res, next) => {
  res.status(404).sendFile(path.join(__dirname, "views", "404.html"));
});

app.listen(8080);
