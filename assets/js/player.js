import {
  disableCanvas,
  hideControls,
  enableCanvas,
  resetCanvas,
  showControls
} from "./paint";
import { disableChat, enableChat } from "./chat";

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

const setNotifis = text => {
  notifs.innerText = "";
  notifs.innerText = text;
};

export const handlePlayerUpdate = ({ sockets }) => addPlayers(sockets);

export const handleGameStarted = () => {
  setNotifis("");
  disableCanvas();
  hideControls();
  enableChat();
};

export const handleLeaderNotif = ({ word }) => {
  enableCanvas();
  showControls();
  disableChat();
  notifs.innerText = `당신이 그릴 차례입니다. 그릴 단어 : ${word}`;
};

export const handleGameEnded = () => {
  setNotifis("게임이 끝났습니다.");
  disableCanvas();
  hideControls();
  resetCanvas();
};

export const handleGameStarting = () => setNotifis("게임이 곧 시작됩니다.");
