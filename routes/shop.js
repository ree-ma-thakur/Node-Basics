const path = require("path");
const express = require("express");
const rootDir = require("../util/path");
const router = express.Router();
const adminData = require("./admin");

router.get("/", (req, res, next) => {
  console.log(adminData.products); // This way we can get the data, but the problem is this data is inehrent to our node server as it is running therefore shared across all users (if we add book from chrome & open localhost in firefox I still get that book in products there)
  res.sendFile(path.join(rootDir, "views", "shop.html"));
});

module.exports = router;
