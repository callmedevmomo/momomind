import events from "./events";

const socketController = socket => {
  const broadcast = (event, data) => socket.broadcast.emit(event, data);
  // event in login (just backend)
  socket.on(events.setNickname, ({ nickname }) => {
    // console.log(nickname, socket.nickname);
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname });
  });
  socket.on(events.disconnect, () => {
    broadcast(events.disconnected, { nickname: socket.nickname });
    // console.log("disconnected");
  });
};

export default socketController;
