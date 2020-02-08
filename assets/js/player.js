import { disableCanvas, hideControls, enableCanvas } from "./paint";

const board = document.getElementById("jsPBoard");
const notifs = document.getElementById("jsNotifs");

const addPlayers = players => {
  board.innerHTML = "";
  players.forEach(player => {
    const playerElement = document.createElement("span");
    playerElement.innerText = `${player.nickname} : ${player.points}`;
    board.appendChild(playerElement);
  });
};
export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  //disable canvas events
  disableCanvas();
  hideControls();
  //hide the canvas controls
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  notifs.innerText = "";
  notifs.innerText = `당신이 그릴 차례입니다. 그릴 단어 : ${word}`;
};
