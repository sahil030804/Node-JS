// -- Common JS Module --

// let { randomNumber, celToFer } = require("./utility");

// let ans = randomNumber();
// console.log(`Random Number Is : ${ans}`);

// console.log(`Celcius To Feranhite = ${celToFer(20)}`);


// -- ES Module --

// import anything, { dataLength } from "./postController.js";

// console.log(anything());
// console.log(anything());
// console.log(dataLength());

// let { generateRandomNumber, celToFer } = require("./utility");

// console.log(generateRandomNumber());
// console.log(celToFer(40));

// import generateRandomNumber, { celToFer } from "./utility.js";

// console.log(generateRandomNumber());
// console.log(celToFer(40));

import { createServer } from "http";
import fs from "fs";

// Create the server
const server = createServer((req, res) => {
  // Handle DELETE request
  let body = "";
  if (req.method === "POST" && req.url === "/replace") {
    req.on("data", (chunk) => {
      body += chunk.toString();
      console.log(body);
    });

    req.on("end", () => {
      fs.writeFile("./text.txt", body, (err) => {
        // Send success response
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File written successfully");
      });
    });
  } else if (req.method === "POST" && req.url === "/append") {
    req.on("data", (chunk) => {
      body += "\n";
      body += chunk.toString();
      console.log(body);
    });

    req.on("end", () => {
      fs.appendFile("./text.txt", body, (err) => {
        // Send success response
        res.writeHead(200, { "Content-Type": "text/plain" });
        res.end("File written successfully");
      });
    });
    
  } else {
    // For unsupported routes
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Method is not allowed" }));
  }
});

// Listen on port 3000
server.listen(3000, () => {
  console.log("Server running on port 3000");
});
