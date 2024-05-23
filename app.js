// const http = require("./http");  // it will look for http local file because we added ./
const http = require("http");
const routes = require("./routes");

console.log(routes.someText);

const server = http.createServer(routes.handler);

server.listen(8080);
