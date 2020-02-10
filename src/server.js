import { join } from "path";
import express from "express";
import socketIO from "socket.io";
import dotenv from "dotenv";
import logger from "morgan";
import socketController from "./socketController";
import events from "./events";

dotenv.config();

const PORT = process.env.PORT || 4000;

const app = express();

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

const io = socketIO.listen(server);

io.on("connection", socket => socketController(socket, io));
