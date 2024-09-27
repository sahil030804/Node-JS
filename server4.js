import { createServer } from "http";
import { parse } from "path";
let Port = process.env.Port;

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "James" },
  { id: 3, name: "joey" },
];

//Logger Middleware
const logger = (req, res, next) => {
  console.log(`Method : ${req.method} and URL : ${req.url}`);
  next();
};

//Get all users handler
let getAllUsers = (req, res) => {
  if (users.length !== 0) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify(users));
    res.end();
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.write(JSON.stringify({ message: "User not found" }));
    res.end();
  }
};

//Get User by id handler
let getUserByIdHandler = (req, res) => {
  let id = req.url.split("/")[3];
  let user = users.find((user) => user.id === parseInt(id));

  console.log(user);
  console.log(typeof user);
  if (user) {
    res.writeHead(200, { "Content-type": "application/json" });
    res.write(JSON.stringify(user));
    res.end();
  } else {
    res.writeHead(404, { "Content-type": "application/json" });
    res.write(JSON.stringify({ message: "User not found" }));
    res.end();
  }
};

//Create User with POST method
let createUserHandler = (req, res) => {
  let body = "";
  req.on("data", (chunk) => {
    body += chunk.toString();
  });

  req.on("end", () => {
    let newUser = JSON.parse(body);
    users.push(newUser);
    res.write(JSON.stringify(newUser));
    res.end();
  });
};

//Remove user by id
let removeUserById = (req, res) => {
  let id = req.url.split("/")[3];
  let userIndex = users.findIndex((userIndex) => userIndex.id === parseInt(id));
  console.log(users[userIndex]);

  if (userIndex !== -1) {
    // Proper check for valid index
    users.splice(userIndex, 1); // Remove the user from the array
    res.writeHead(200, { "Content-type": "text/plain" });
    res.write("User Deleted");
  } else {
    res.writeHead(404, { "Content-type": "text/plain" });
    res.write("User Not Found");
  }
  console.log(users);
  res.end();
};

//Method Error handler
let methodError = (req, res) => {
  res.writeHead(404, { "Content-type": "application/json" });
  res.write(JSON.stringify({ message: "Method not allowed" }));
  res.end();
};

//server error handler
let serverError = (req, res) => {
  res.writeHead(500, { "Content-type": "application/json" });
  res.write(JSON.stringify({ message: "Server Error" }));
  res.end();
};

const server = createServer((req, res) => {
  logger(req, res, () => {
    try {
      if (req.method === "GET" && req.url === "/api/users") {
        getAllUsers(req, res);
      } else {
        throw new Error("method not allowed");
      }
    } catch (error) {
      serverError(req, res);
    }
  });
});


server.listen(Port, () => {
  console.log(`Server is running on port : ${Port}`);
});
