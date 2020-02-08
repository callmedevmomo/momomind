import { getSocket } from "./sockets";

const messages = document.getElementById("jsMessages");
const sendMsg = document.getElementById("jsSendMsg");

const appendMessage = (text, nickname) => {
  const li = document.createElement("li");
  li.innerHTML = `
<span class="author ${nickname ? "out" : "self"}">${
    nickname ? nickname + "님의 메세지" : "내 메세지"
  } : </span> ${text}`;
  //   scrollview handling! 최신상태의 리스트 뷰
  messages.scrollTop = messages.scrollHeight;
  messages.appendChild(li);
};
const handleSendMsg = event => {
  event.preventDefault();
  const input = sendMsg.querySelector("input");
  const { value } = input;
  getSocket().emit(window.events.sendMsg, { message: value });
  input.value = "";
  appendMessage(value);
};
export const handleNewMessage = ({ message, nickname }) =>
  appendMessage(message, nickname);

if (sendMsg) {
  sendMsg.addEventListener("submit", handleSendMsg);
}
