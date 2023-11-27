const http = require("http");
const { CreateUser, GetUser, Login } = require("./controller/customer");
const { ConnectDB } = require("./config/db");
const {
  CreateRoom,
  UpdateRoom,
  GetRoom,
  GetAllRooms,
  DeleteRoom,
} = require("./controller/room");
const GetParam = require("./util/getParams");
const PORT = process.env.PORT || 6000;

ConnectDB();

const server = http.createServer(async (req, res) => {
  const { endpoint, id } = GetParam(req);
  if (req.url === "/api" && req.method === "GET") {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.write("Hi there, This is a Vanilla Node.js API");
    res.end();
  } else if (req.method === "POST" && req.url === "/users") {
    CreateUser(req, res);
  } else if (req.method === "POST" && req.url === "/users/login") {
    Login(req, res);
  } else if (req.method === "GET" && req.url === "/users") {
    GetUser(req, res);
  } else if (req.method === "POST" && req.url === "/rooms") {
    CreateRoom(req, res);
  } else if (req.method === "PUT" && req.url === "/rooms") {
    UpdateRoom(req, res);
  } else if (req.method === "GET" && req.url === "/rooms") {
    GetAllRooms(req, res);
  } else if (req.method === "GET" && endpoint === "rooms" && id) {
    GetRoom(req, res, id);
  } else if (req.method === "DELETE" && endpoint === "rooms" && id) {
    DeleteRoom(req, res, id);
  } else {
    res.writeHead(404, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: "Route not found" }));
  }
});

server.listen(PORT, () => console.log(`Server started at ${PORT}`));
