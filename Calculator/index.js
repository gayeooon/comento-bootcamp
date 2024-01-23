const input = document.getElementById("cal__screen__cur-input");
const prevInput = document.getElementById("cal__screen__prev-input");
const result = document.getElementById("cal__screen__result");

const numberBtns = document.querySelectorAll(".cal__btns__num");
const opBtns = document.querySelectorAll(".cal__btns__op");

const inputHistory = [];
const resultHistory = [];

// 숫자 버튼 구현
const numClink = function (btn) {
  if (result.textContent !== "") {
    result.textContent = "";
    prevInput.textContent = "";
  }
  if (input.textContent.length >= 14) {
    alert("14자리까지 입력할 수 있습니다.");
  } else {
    input.textContent += btn.textContent;
  }
};

numberBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    numClink(btn);
  });
});

// operator 버튼 구현
let opOrder = false;

const opClick = function () {
  if (input.textContent !== "") {
    let number = parseInt(input.textContent);
    prevInput.textContent += number;
    input.textContent = "";

    prevInput.scrollTo(0, prevInput.scrollHeight);
    opOrder = true;
  }
};

opBtns.forEach(function (btn) {
  btn.addEventListener("click", opClick);
});

// operator 추가
const addOperator = function (id, operator) {
  const opBtn = document.getElementById(id);

  opBtn.addEventListener("click", function () {
    if (opOrder) {
      prevInput.textContent += operator;
      opOrder = false;
    }
  });
};

addOperator("cal__btns__plus", "+");
addOperator("cal__btns__minus", "-");
addOperator("cal__btns__multiply", "*");
addOperator("cal__btns__divide", "/");

// equal 버튼 구현

const equalClick = function () {
  if (opOrder) {
    let resultNum = parseFloat(eval(prevInput.textContent));
    resultNum = parseFloat(resultNum.toFixed(5));
    result.textContent = resultNum;
    resultHistory.push(resultNum);
    inputHistory.push(prevInput.textContent);
    opOrder = false;
  }
};

const equal = document.getElementById("cal__btns__equals");
equal.addEventListener("click", equalClick);

// reset 버튼 구현
const resetClick = function () {
  prevInput.textContent = "";
  input.textContent = "";
  result.textContent = "";
};

const reset = document.getElementById("cal__btns__reset");
reset.addEventListener("click", resetClick);

// history 버튼 구현
const history = document.getElementById("cal__history");
const screen = document.getElementById("cal__screen");

const historyClick = function () {
  let screenDiv = document.getElementById("cal__screen__history");

  if (screenDiv) {
    screenDiv.remove();
    history.style.backgroundColor = "";
  } else {
    let newDiv = document.createElement("div");
    newDiv.id = "cal__screen__history";
    screen.appendChild(newDiv);

    screenDiv = document.getElementById("cal__screen__history");

    for (let i = inputHistory.length - 1; i >= 0; i--) {
      screenDiv.innerHTML +=
        inputHistory[i] + " = " + resultHistory[i] + "<br /><br />";
    }

    history.style.backgroundColor = "rgb(197, 214, 198)";
  }
};

history.addEventListener("click", historyClick);
