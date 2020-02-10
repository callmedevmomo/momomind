const timeContainer = document.getElementById("jsTime");

let MaximumTime = 51;
let decreased = null;

const decrease = () => {
  MaximumTime -= 1;
  timeContainer.innerText = MaximumTime;
  if (MaximumTime < 0) {
    timeContainer.innerText = "";
    MaximumTime = 51;
    clearInterval(decreased);
  }
};

export const handleTimeOut = () => {
  decreased = setInterval(decrease, 1000);
};

export const handleResetTimeOut = () => {
  MaximumTime = 51;
  timeContainer.innerText = "";
  clearInterval(decreased);
};
