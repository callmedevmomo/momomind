import { handleNewUser, handleDisconnected } from "./notification";
import { handleNewMessage } from "./chat";
import { handleBeganPath, handleStrokedPath, handleFilled } from "./paint";
import {
  handlePlayerUpdate,
  handleGameStarted,
  handleLeaderNotif,
  handleGameEnded,
  handleGameStarting
} from "./player";
import { handleResetTimeOut, handleTimeOut } from "./time";
// handle all subscriptions

let socket = null;

export const getSocket = () => socket;

export const initSockets = aSocket => {
  const { events } = window;
  socket = aSocket;
  socket.on(events.newUser, handleNewUser);
  socket.on(events.disconnected, handleDisconnected);
  socket.on(events.newMsg, handleNewMessage);
  socket.on(events.beganPath, handleBeganPath);
  socket.on(events.strokedPath, handleStrokedPath);
  socket.on(events.filled, handleFilled);
  socket.on(events.playerUpdate, handlePlayerUpdate);
  socket.on(events.gameStarted, handleGameStarted);
  socket.on(events.leaderNotif, handleLeaderNotif);
  socket.on(events.gameEnded, handleGameEnded);
  socket.on(events.gameStarting, handleGameStarting);
  socket.on(events.timeOut, handleTimeOut);
  socket.on(events.resetTimeOut, handleResetTimeOut);
};
