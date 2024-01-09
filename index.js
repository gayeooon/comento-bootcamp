const input = document.getElementById("cal__input");
const result = document.getElementById("cal__result");
const numberBtns = document.querySelectorAll(".cal__btns__num");
const opBtns = document.querySelectorAll(".cal__btns__op");
const formulas = [];

numberBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    formulas.push(btn.textContent);
    input.textContent = input.textContent + btn.textContent;
  });
});

opBtns.forEach(function (btn) {
  btn.addEventListener("click", function () {
    let number = input.textContent;
    formulas.push(number);
  });
});
