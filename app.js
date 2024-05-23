// const http = require("./http");  // it will look for http local file because we added ./
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  // console.log(req.url, req.method, req.headers);
  // process.exit(); // it will de-resgutser the createServer
  const url = req.url;
  const method = req.method;
  if (url === "/") {
    res.write("<html>");
    res.write("<head><title>Enter message</title></head>");
    res.write(
      "<body><form action='/message' method='POST'><input type='text' name='mymessage'/><button type='submit'>Send</button></form></body>"
    ); // action on form is basically url this request will generate automatically
    res.write("</html>");
    return res.end(); // return is added to get out of the statement
  }
  if (url === "/message" && method === "POST") {
    fs.writeFileSync("message.txt", "DUMMY");
    res.statusCode = 302;
    res.setHeader("Location", "/");
    return res.end();
  }
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my nodejs server!</h1></body>");
  res.write("</html>");
  res.end(); // With this nodejs will send res back to client; we can no more write to res
});

server.listen(8080);
