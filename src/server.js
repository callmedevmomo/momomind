import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

const PORT = 4000;

const app = express();

// why we use join ?
// console.log(join(__dirname, "views"));

app.set("view engine", "pug");

app.use(express.static(join(__dirname, "static")));
app.use(logger("dev"));
app.get("/", (req, res) =>
  res.render("home", { events: JSON.stringify(events) })
);

const handleListening = () => {
  console.log(`✅  Server running bro! : http://localhost:${PORT}`);
};

const server = app.listen(PORT, handleListening);

// http://localhost:4000/socket.io/socket.io.js

// io going to listen all events :: io is a server
const io = socketIO.listen(server);

// with event occured
// server emit events :: client listening to it.

// what is the difference socket.broadcast.emit and socket.emit
io.on("connection", socket => socketController(socket));
