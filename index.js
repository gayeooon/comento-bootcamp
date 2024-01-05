const levelList = document.getElementById("level");
const board = document.getElementById("board");
const bombCounter = document.getElementById("header__bombCounter");

const levelData = {
  easy: { divCount: 81, bombCount: 10, gridColumn: 9, gridRow: 9 },
  medium: { divCount: 256, bombCount: 40, gridColumn: 16, gridRow: 16 },
  hard: { divCount: 480, bombCount: 99, gridColumn: 30, gridRow: 16 },
};

let intervalID = null;

const setTime = function (time) {
  return function () {
    document.getElementById("header__timeCounter").textContent = String(
      time
    ).padStart(3, "0");

    if (time < 999) return time++;
    return time;
  };
};

const setBoard = function () {
  board.innerHTML = "";

  let level = levelList.value;
  let { divCount, bombCount, gridColumn, gridRow } = levelData[level];

  for (let i = 0; i < divCount; i++) {
    let newDiv = document.createElement("div");
    board.appendChild(newDiv);
  }

  board.style.gridTemplateColumns = `repeat(${gridColumn}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${gridRow}, 1fr)`;

  bombCounter.textContent = String(bombCount).padStart(3, "0");

  if (intervalID) {
    clearInterval(intervalID);
  }

  let timer = setTime(0);
  intervalID = setInterval(timer, 1000);
};

setBoard();

levelList.addEventListener("change", setBoard);
