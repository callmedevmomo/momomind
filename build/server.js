"use strict";

var _path = require("path");

var _express = _interopRequireDefault(require("express"));

var _socket = _interopRequireDefault(require("socket.io"));

var _dotenv = _interopRequireDefault(require("dotenv"));

var _morgan = _interopRequireDefault(require("morgan"));

var _socketController = _interopRequireDefault(require("./socketController"));

var _events = _interopRequireDefault(require("./events"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_dotenv["default"].config();

var PORT = process.env.PORT || 5000;
var app = (0, _express["default"])();
app.set("view engine", "pug");
app.use(_express["default"]["static"]((0, _path.join)(__dirname, "static")));
app.use((0, _morgan["default"])("dev"));
app.get("/", function (req, res) {
  return res.render("home", {
    events: JSON.stringify(_events["default"])
  });
});

var handleListening = function handleListening() {
  console.log("\u2705  Server running bro! : http://localhost:".concat(PORT));
};

var server = app.listen(PORT, handleListening);

var io = _socket["default"].listen(server);

io.on("connection", function (socket) {
  return (0, _socketController["default"])(socket, io);
});