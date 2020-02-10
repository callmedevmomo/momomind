"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _events = _interopRequireDefault(require("./events"));

var _words = require("./words");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var sockets = [];
var inProgress = false;
var word = null;
var leader = null;
var timeout = null;
var LIMITED_TIME = 51000;

var chooseLeader = function chooseLeader() {
  return sockets[Math.floor(Math.random() * sockets.length)];
};

var socketController = function socketController(socket, io) {
  var broadcast = function broadcast(event, data) {
    return socket.broadcast.emit(event, data);
  };

  var superBroadcast = function superBroadcast(event, data) {
    return io.emit(event, data);
  };

  var sendPlayerUpdate = function sendPlayerUpdate() {
    return superBroadcast(_events["default"].playerUpdate, {
      sockets: sockets
    });
  };

  var startGame = function startGame() {
    if (sockets.length > 1) {
      if (inProgress === false) {
        inProgress = true;
        leader = chooseLeader();
        word = (0, _words.chooseWord)();
        superBroadcast(_events["default"].gameStarting);
        setTimeout(function () {
          superBroadcast(_events["default"].gameStarted);
          io.to(leader.id).emit(_events["default"].leaderNotif, {
            word: word
          });
          timeout = setTimeout(endGame, LIMITED_TIME);
          superBroadcast(_events["default"].timeOut);
        }, 3000);
      }
    }
  };

  var endGame = function endGame() {
    inProgress = false;
    superBroadcast(_events["default"].gameEnded);
    superBroadcast(_events["default"].resetTimeOut);

    if (timeout !== null) {
      clearTimeout(timeout);
    }

    setTimeout(function () {
      return startGame();
    }, 2000);
  };

  var addPoints = function addPoints(id) {
    sockets = sockets.map(function (socket) {
      if (socket.id === id) {
        socket.points += 10;
      }

      return socket;
    });
    sendPlayerUpdate();
    endGame();
  }; // event in login (just backend)


  socket.on(_events["default"].setNickname, function (_ref) {
    var nickname = _ref.nickname;
    // console.log(nickname, socket.nickname);
    socket.nickname = nickname;
    sockets.push({
      id: socket.id,
      points: 0,
      nickname: nickname
    });
    broadcast(_events["default"].newUser, {
      nickname: nickname
    });
    sendPlayerUpdate();
    startGame();
  });
  socket.on(_events["default"].disconnect, function () {
    sockets = sockets.filter(function (aSocket) {
      return aSocket.id !== socket.id;
    });

    if (sockets.length === 1) {
      endGame();
    } else if (leader) {
      if (leader.id === socket.id) {
        endGame();
      }
    }

    broadcast(_events["default"].disconnected, {
      nickname: socket.nickname
    }); // console.log("disconnected");

    sendPlayerUpdate();
  });
  socket.on(_events["default"].sendMsg, function (_ref2) {
    var message = _ref2.message;

    if (message === word) {
      superBroadcast(_events["default"].newMsg, {
        message: "\uC815\uB2F5\uC740 ".concat(word, " \uC785\uB2C8\uB2E4.  ").concat(socket.nickname, "\uB2D8 \uCD95\uD558\uB4DC\uB9BD\uB2C8\uB2E4!"),
        nickname: "도우미"
      });
      addPoints(socket.id);
    }

    broadcast(_events["default"].newMsg, {
      message: message,
      nickname: socket.nickname
    });
  });
  socket.on(_events["default"].beginPath, function (_ref3) {
    var x = _ref3.x,
        y = _ref3.y;
    return broadcast(_events["default"].beganPath, {
      x: x,
      y: y
    });
  });
  socket.on(_events["default"].strokePath, function (_ref4) {
    var x = _ref4.x,
        y = _ref4.y,
        color = _ref4.color;
    broadcast(_events["default"].strokedPath, {
      x: x,
      y: y,
      color: color
    });
  });
  socket.on(_events["default"].fill, function (_ref5) {
    var color = _ref5.color;
    return broadcast(_events["default"].filled, {
      color: color
    });
  });
};

var _default = socketController;
exports["default"] = _default;