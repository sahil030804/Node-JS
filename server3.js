import { createServer } from "http";
import fs from "fs/promises";
import url from "url";
import path from "path";

let Port = process.env.Port;

// //Get Current Path
// let __fileName = url.fileURLToPath(import.meta.url);
// let __dirName = path.dirname(__fileName);

// console.log(__fileName);
// console.log(__dirName);



// let data = [
//   { id: 1, name: "one" },
//   { id: 2, name: "two" },
//   { id: 3, name: "three" },
// ];

// let server = createServer(async (req, res) => {
//   try {
//     let filePath;
//     if (req.url === "/") {
//       filePath = path.join(__dirName, "public", "index.html");
//     } else if (req.url === "/about") {
//       filePath = path.join(__dirName, "public", "about.html");
//     }

//     const data = await fs.readFile(filePath);
//     res.writeHead(200, { "Content-type": "text/html" });
//     res.write(data);
//     res.end();
//   } catch (error) {
//     res.writeHead(500, { "Content-type": "text/plain" });
//     res.write("Server Error");
//     res.end();
//   }
// });

let users = [
  { id: 1, name: "John doe" },
  { id: 2, name: "Jems doe" },
  { id: 3, name: "Joey doe" },
];

//Logger Middleware
const logger = (req, res, next) => {
  console.log(`Method is : ${req.method} and URL is : ${req.url} `);
  next();
};

//Get all Users handler
const getAllUsers = (req, res) => {
  res.writeHead(200, { "Content-type": "application/json" });
  res.write(JSON.stringify(users));
  res.end();
};

//Get users by id
const getUserById = (req, res) => {
  const id = req.url.split("/")[3];
  let user = users.find((user) => user.id === parseInt(id));
  //   console.log(id);

  if (user) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify(user));
    res.end();
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("User Not Found");
  }
};

//Create user handler
const createUserHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    const newUser = JSON.parse(body);
    users.push(newUser);
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

// //Delete user handler
// const deleteUserHandler = (req, res) => {
//   // Extract user ID from the URL
//   const userId = parseInt(url.split("/")[3]);
//   console.log(userId);

//   // Filter out the user from the users array
//   const userExists = users.some((user) => user.id === userId);

//   if (userExists) {
//     users = users.filter((user) => user.id !== userId);
//     res.writeHead(200, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: `User ${userId} deleted`, users }));
//   } else {
//     res.writeHead(404, { "Content-Type": "application/json" });
//     res.end(JSON.stringify({ message: "User not found" }));
//   }
// };

//Method Error

const methodError = (req, res) => {
  res.writeHead(404, { "Content-type": "text/plain" });
  res.write("Method Is not allowed");
};

//Give server error
const serverError = (req, res) => {
  res.writeHead(500, { "Content-type": "text/plain" });
  res.write("Server Error");
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    try {
      if (req.method === "GET" && req.url === "/api/users") {
        getAllUsers(req, res);
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserById(req, res);
      } else if (req.method === "POST" && req.url === "/api/users") {
        createUserHandler(req, res);
      }
      //   else if (req.method === "DELETE" && req.url === "/api/users") {
      //     deleteUserHandler(req, res);
      //   }
      res.end();
    } catch (error) {
      serverError(req, res);
    }
  });
});

server.listen(Port, () => {
  console.log(`Server Running on ${Port}`);
});
