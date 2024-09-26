import http from "http";
import { error } from "console";
const PORT = process.env.PORT

let users = [
  { id: 1, name: "John" },
  { id: 2, name: "Joey" },
  { id: 3, name: "James" },
];

let logger = (req, res, next) => {
  console.log(`Method : ${req.method} and URL : ${req.url}`);
  next();
};

//GET user by id
let getUserById = (req, res) => {
  let id = req.url.split("/")[3];
  let user = users.find((user) => user.id === parseInt(id));
  console.log(user);

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

let server = http.createServer((req, res) => {
  logger(req, res, () => {
    try {
      if (req.url === "/api/users" && req.method === "GET") {
        res.writeHead(200, { "Content-type": "application/json" });
        res.write(JSON.stringify(users));
        res.end();
      } else if (
        req.url.match(/\/api\/users\/([0-9]+)/) &&
        req.method === "GET"
      ) {
        getUserById(req, res);
      } else {
        res.writeHead(404, { "Content-type": "application/json" });
        res.write(JSON.stringify({ message: "Method is not allowed" }));
        res.end;
      }
    } catch (error) {
      res.writeHead(500, { "Content-type": "application/json" });
      res.write(JSON.stringify({ message: "Server Error" }));
      res.end();
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server currnetly running on ${PORT}`);
});
