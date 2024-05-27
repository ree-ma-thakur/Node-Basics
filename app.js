const express = require("express");

const app = express(); // app here is the valid request handler therefore we can paas it to createServer
// funciton inside use will be executes for every incoming request & this fun will receive 3 arguments
app.use((req, res, next) => {
  console.log("in middleware");
  next(); // It allows us to travel the request to next middleware in line otherwise request will dir here & will not continue in next middleware
});
app.use((req, res, next) => {
  console.log("in another middleware");
  res.send("<h1>Hello from express</h1>"); // It allows us to send a response
});

app.listen(8080); // listen from express is same as : const server = http.createServer(app); server.listen(8080);
