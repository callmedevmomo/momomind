const loginForm = document.getElementById("jsLogin");
const body = document.querySelector("body");

const NICKNAME = "nickname";
const nickname = localStorage.getItem("nickname");
const LOGGED_OUT = "loggedOut";
const LOGGED_IN = "loggedIn";
//login 조건에 맞는 body 출력
if (nickname === null) {
  body.className = LOGGED_OUT;
} else {
  body.className = LOGGED_IN;
}

const handleFormSubmit = event => {
  event.preventDefault();
  const input = loginForm.querySelector("input");
  const { value } = input;
  // console.log(value);
  input.value = "";
  localStorage.setItem(NICKNAME, value);
};

if (loginForm) {
  loginForm.addEventListener("submit", handleFormSubmit);
}
