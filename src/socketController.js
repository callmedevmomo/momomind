import events from "./events";

const socketController = socket => {
  // event in login (just backend)
  socket.on(events.setNickname, ({ nickname }) => {
    // console.log(nickname, socket.nickname);
    socket.nickname = nickname;
    socket.broadcast.emit(events.newUser, { nickname });
  });
};

export default socketController;
