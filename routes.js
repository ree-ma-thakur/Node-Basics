const fs = require("fs");

const requestHandler = (req, res) => {
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
    const body = [];
    //  to get request data
    //  on allows us to listen to certain events (data event etc); data event is fired whenever new chunk is ready to be read; 1st argument is event, 2nd is function that should be executed for every data event (similar to createServer)
    req.on("data", (chunk) => {
      // console.log(chunk);
      body.push(chunk);
    });
    //  end will run when parsing is done
    // node will not run this funtion immediately but it will simply add new event listener & manage it internally, it will be called when parsing the request the done, it will not pause the other code execution
    return req.on("end", () => {
      const parsedBody = Buffer.concat(body).toString();
      // console.log(parsedBody);
      const message = parsedBody.split("=")[1];
      // fs.writeFileSync("message.txt", message);
      fs.writeFile("message.txt", message, (err) => {
        res.statusCode = 302;
        res.setHeader("Location", "/");
        return res.end();
      });
    });
  }
  // this code will run before the 'end' callback function if we didn't add return to above 'end' req.on
  res.setHeader("Content-Type", "text/html");
  res.write("<html>");
  res.write("<head><title>My first page</title></head>");
  res.write("<body><h1>Hello from my nodejs server!</h1></body>");
  res.write("</html>");
  res.end(); // With this nodejs will send res back to client; we can no more write to res
};

// To export function
// module.exports = requestHandler;

// module.exports = {
//     handler: requestHandler,
//     someText: 'Some hard coded text'
// };

// module.exports.handler = requestHandler;
// module.exports.someText = 'Some text';

exports.handler = requestHandler;
exports.someText = "Some hard coded text";
