import { error } from "console";
import http from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";
let Port = process.env.Port;

const __fileName = url.fileURLToPath(import.meta.url);
const __dirName = path.dirname(__fileName);

console.log(__fileName, __dirName);



let server = http.createServer(async (req, res) => {
  //   console.log(req.url);
  //   console.log(req.method);

  //   res.setHeader("content-type", "text/html");
  //   res.statusCode = 404;
  try {
    if (req.method === "GET") {
      let filePath;
      if (req.url === "/") {
        filePath = path.join(__dirName, "public", "index.html");
      } else if (req.url === "/about") {
        filePath = path.join(__dirName, "public", "about.html");
      } else {
        throw new Error("Page not found");
      }

      const data = await fs.readFile(filePath);
      res.setHeader("Content-type", "text;/html");
      res.write(data);
      res.end;
    } else {
      throw new Error("Method Is Not Allowed");
    }
  } catch (error) {
    res.writeHead(500, { "Content-type": "text/plain" });
    res.end(`Server Error`);
  }
});

// app.post("/about", (res) => {
//   res.end("<h1>This is about page</h1>");
// });

server.listen(Port, () => {
  console.log(`Server Running on ${Port}`);
});
