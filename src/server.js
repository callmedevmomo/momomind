import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";

const PORT = 4000;

const app = express();

// why we use join ?
// console.log(join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));
app.get("/", (req, res) => res.render("home"));

const handleListening = () => {
  console.log(`✅  Server running bro! : http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

// http://localhost:4000/socket.io/socket.io.js

let sockets = [];

const io = socketIO.listen(server);
// with event occured
io.on("connection", socket => {
  sockets.push(socket.id);
});

setInterval(() => console.log(sockets), 1000);
