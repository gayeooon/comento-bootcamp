const input = document.getElementById("cal__screen__cur-input");
const prevInput = document.getElementById("cal__screen__prev-input");
const result = document.getElementById("cal__screen__result");

const numberBtns = document.querySelectorAll(".cal__btns__num");
const opBtns = document.querySelectorAll(".cal__btns__op");

const inputHistory = [];
const resultHistory = [];

numberBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (result.textContent !== "") {
      result.textContent = "";
      prevInput.textContent = "";
    }
    input.textContent += btn.textContent;
  });
});

// operator 버튼 구현
let opOrder = false;

opBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    if (input.textContent !== "") {
      let number = parseInt(input.textContent);
      prevInput.textContent += number;
      input.textContent = "";
      opOrder = true;
    }
  });
});

// plus 버튼 구현
const plus = document.getElementById("cal__btns__plus");

plus.addEventListener("click", function () {
  if (opOrder) {
    prevInput.textContent += "+";
    opOrder = false;
  }
});

// minus 버튼 구현
const minus = document.getElementById("cal__btns__minus");

minus.addEventListener("click", function () {
  if (opOrder) {
    prevInput.textContent += "-";
    opOrder = false;
  }
});

// multiply 버튼 구현
const multiply = document.getElementById("cal__btns__multiply");

multiply.addEventListener("click", function () {
  if (opOrder) {
    prevInput.textContent += "*";
    opOrder = false;
  }
});

// divide 버튼 구현
const divide = document.getElementById("cal__btns__divide");

divide.addEventListener("click", function () {
  if (opOrder) {
    prevInput.textContent += "/";
    opOrder = false;
  }
});

// equal 버튼 구현
const equal = document.getElementById("cal__btns__equals");

equal.addEventListener("click", function () {
  if (opOrder) {
    let resultNum = parseFloat(eval(prevInput.textContent));
    resultNum = parseFloat(resultNum.toFixed(5));
    result.textContent = resultNum;
    resultHistory.push(resultNum);
    inputHistory.push(prevInput.textContent);
    opOrder = false;
  }
});

// reset 버튼 구현
const reset = document.getElementById("cal__btns__reset");

reset.addEventListener("click", function () {
  prevInput.textContent = "";
  input.textContent = "";
  result.textContent = "";
});

// history 버튼 구현
const history = document.getElementById("cal__history");
const screen = document.getElementById("cal__screen");
let historyOn = false;

history.addEventListener("click", function () {
  let screenDiv = document.getElementById("cal__screen__history");

  if (historyOn) {
    screenDiv.remove();
    historyOn = false;
  } else {
    let newDiv = document.createElement("div");
    newDiv.id = "cal__screen__history";
    screen.appendChild(newDiv);

    screenDiv = document.getElementById("cal__screen__history");

    for (let i = 0; i < inputHistory.length; i++) {
      screenDiv.innerHTML +=
        inputHistory[i] + " = " + resultHistory[i] + "<br>";
    }

    historyOn = true;
  }
});
