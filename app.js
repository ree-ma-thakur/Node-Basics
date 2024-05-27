const express = require("express");

const app = express();

app.use("/", (req, res, next) => {
  console.log("always here");
  next();
});

app.use("/add-product", (req, res, next) => {
  console.log("in another middleware");
  res.send("<h1>The 'Add Product' Page</h1>"); // It allows us to send a response
});

app.use("/", (req, res, next) => {
  console.log("in main middleware");
  res.send("<h1>Hello from express</h1>"); // It allows us to send a response
});

app.listen(8080); // listen from express is same as : const server = http.createServer(app); server.listen(8080);
