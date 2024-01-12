const year = document.getElementById("date__year");
const month = document.getElementById("date__month");
const day = document.getElementById("date__day");

const hour = document.getElementById("clock__panel__hour");
const min = document.getElementById("clock__panel__min");
const sec = document.getElementById("clock__panel__sec");

const currentTime = new Date();

const setClock = function () {
  currentTime.setTime(Date.now());

  year.textContent = currentTime.getFullYear();
  month.textContent = currentTime.getMonth() + 1;
  day.textContent = currentTime.getDate();

  hour.textContent = String(currentTime.getHours()).padStart(2, "0");
  min.textContent = String(currentTime.getMinutes()).padStart(2, "0");
  sec.textContent = String(currentTime.getSeconds()).padStart(2, "0");
};

let battery = 100;
let batteryPercents = {
  25: document.getElementById("battery__25"),
  50: document.getElementById("battery__50"),
  75: document.getElementById("battery__75"),
  100: document.getElementById("battery__100"),
};

const setBattery = function () {
  if (battery === 0) {
    if (batteryPercents[25]) batteryPercents[25].remove();
    return battery;
  }
  if (battery <= 25 && batteryPercents[50]) batteryPercents[50].remove();
  if (battery <= 50 && batteryPercents[75]) batteryPercents[75].remove();
  if (battery <= 75 && batteryPercents[100]) batteryPercents[100].remove();

  battery--;
};

const timeInput = document.getElementById("add-alarms__time");
const alarm = document.getElementById("alarm");
let counter = 0;

document
  .getElementById("add-alarms")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    if (counter < 3) {
      const newDiv = document.createElement("div");
      newDiv.classList.add("alarm__item");
      alarm.appendChild(newDiv);
      newDiv.innerHTML = '<i class="fa-solid fa-toggle-on"></i>';

      const timeDiv = document.createElement("div");
      timeDiv.classList.add("alarm__item__time");
      newDiv.appendChild(timeDiv);
      timeDiv.textContent = timeInput.value;

      counter++;
    } else {
      alert("알람은 최대 3개만 추가할 수 있습니다.");
    }
  });

alarm.addEventListener("click", function (event) {
  if (event.target.classCList.contains("fa-toggle-on")) {
    const rmDiv = event.target.parentNode;
    rmDiv.remove();

    counter--;
  }
});

let intervalID = null;

intervalID = setInterval(function () {
  setClock();
  let batteryStatus = setBattery();

  if (batteryStatus === 0) {
    clearInterval(intervalID);
    hour.textContent = "";
    min.textContent = "";
    sec.textContent = "";
  }
}, 1000);
