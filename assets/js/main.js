import { handleMessageNotif } from "./chat";

const socket = io("/");

function sendMessage(message) {
  socket.emit("newMessage", { message });
  console.log(`You : ${message}`);
}

function setNickName(nickname) {
  socket.emit("setNickname", { nickname });
}

socket.on("messageNotif", handleMessageNotif);
