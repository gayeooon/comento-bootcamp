const levelList = document.getElementById("level");
const board = document.getElementById("board");
const bombCounter = document.getElementById("header__bombCounter");

const levelData = {
  easy: { divCount: 81, bomCount: 10, gridColumn: 9, gridRow: 9 },
  medium: { divCount: 256, bomCount: 40, gridColumn: 16, gridRow: 16 },
  hard: { divCount: 480, bomCount: 99, gridColumn: 30, gridRow: 16 },
};

let intervalID = null;

const setBoard = function () {
  board.innerHTML = "";

  let level = levelList.value;
  let { divCount, bomCount, gridColumn, gridRow } = levelData[level];

  Array.from({ length: divCount }, () => {
    let newDiv = document.createElement("div");
    board.appendChild(newDiv);
  });
  board.style.gridTemplateColumns = `repeat(${gridColumn}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${gridRow}, 1fr)`;

  bombCounter.textContent = String(bomCount).padStart(3, "0");

  const setTime = function () {
    let time = 0;
    return function () {
      document.getElementById("header__timeCounter").textContent = String(
        time
      ).padStart(3, "0");

      if (time < 999) return time++;
      return time;
    };
  };

  if (intervalID) {
    clearInterval(intervalID);
  }
  intervalID = setInterval(setTime(), 1000);
};

setBoard();

levelList.addEventListener("change", setBoard);
