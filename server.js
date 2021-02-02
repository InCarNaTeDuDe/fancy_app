const http = require("http"),
  //   querystring = require("querystring"),
  url = require("url"),
  fs = require("fs");

const PORT = process.env.PORT || 8080;

function send404(response) {
  response.writeHead(404, { "Content-Type": "text/plain" });
  response.write("Error 404: Resource not found.");
  response.end();
}

http
  .createServer(function (req, res) {
    //   const parsed = url.parse(req.url);
    //   const query = querystring.parse(parsed.query);
    //   console.log("Query:--", query);
    const queryObject = url.parse(req.url, true).query;

    if (queryObject && queryObject.bhavya === "true") {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("./index.html", (err, fileContent) => {
        if (err) {
          send404(res);
          return;
        }
        res.end(fileContent);
      });
    } else {
      res.writeHead(200, { "Content-Type": "text/html" });
      fs.readFile("./invalid.html", (err, fileContent) => {
        if (err) {
          send404(res);
          return;
        }
        res.end(fileContent);
      });
    }
  })
  .listen(PORT || 8080, () => console.log(`App started on ${PORT}`));
