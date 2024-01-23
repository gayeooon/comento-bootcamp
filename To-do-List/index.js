// 날짜 설정 객체 생성 함수

const createDateObject = function (i) {
  let date = new Date();
  date.setDate(date.getDate() + i);
  const daysList = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  let dateObject = {
    day: daysList[date.getDay()],
    date: date.getDate(),
  };

  return dateObject;
};

// week 날짜 설정

const weekDiv = document.getElementById("week-date");
const setWeek = function () {
  weekDiv.innerHTML = "";

  for (let i = 0; i < 7; i++) {
    let dateObject = createDateObject(i);

    let dateDiv = document.createElement("div");
    dateDiv.className = "week-date__divs";

    let dateDivName = document.createElement("div");
    dateDivName.className = "week-date__name";
    dateDivName.innerText = dateObject.day;
    dateDiv.appendChild(dateDivName);

    let dateDivNum = document.createElement("div");
    dateDivNum.className = "week-date__num";
    dateDivNum.innerText = dateObject.date;
    dateDiv.appendChild(dateDivNum);

    weekDiv.appendChild(dateDiv);
  }

  let selected = document.querySelector(".week-date__divs");
  selected.classList.add("week-date__selected");
};

// 일정 생성 후 저장

const taskList = {};
const taskForm = document.getElementById("add-task");

const addTask = function (event) {
  event.preventDefault();

  let title = document.getElementById("task-name").value;
  let time = document.getElementById("task-time").value;
  let date = document.querySelector(
    ".week-date__selected .week-date__num"
  ).innerText;

  if (!taskList[date]) {
    taskList[date] = [];
  }
  let index = taskList[date].length;
  taskList[date].push({ time, title, index });
  setTaskList();
};
taskForm.addEventListener("submit", function (event) {
  addTask(event);
});

// 일정 목록 구성

const setTaskList = function () {
  let list = document.getElementById("task-list");
  list.innerHTML = "";
  let date = parseInt(
    document.querySelector(".week-date__selected .week-date__num").innerText
  );

  if (taskList[date]) {
    document.getElementById("task-counter").innerText =
      taskList[date].length + " tasks";
    taskList[date].forEach(function (task) {
      let taskItem = document.createElement("div");
      taskItem.classList.add("task-list__item");
      taskItem.id = "index" + task.index;

      let checkBox = document.createElement("input");
      checkBox.type = "checkbox";
      taskItem.appendChild(checkBox);

      let itemContent = document.createElement("div");
      itemContent.className = "task-list__item__content";
      taskItem.appendChild(itemContent);

      let itemTitle = document.createElement("div");
      itemTitle.className = "task-list__item__title";
      itemTitle.innerText = task.title;
      itemContent.appendChild(itemTitle);

      let itemTime = document.createElement("div");
      itemTime.className = "task-list__item__time";
      itemTime.innerText = task.time;
      itemContent.appendChild(itemTime);

      list.appendChild(taskItem);
    });
  } else {
    document.getElementById("task-counter").innerText = "0 tasks";
  }
};

// 선택한 날짜 표시 함수

const weekClick = function (event) {
  let targetElement = event.target.closest(".week-date__divs");

  if (targetElement) {
    let curDate = document.querySelector(".week-date__selected");
    curDate.classList.remove("week-date__selected");

    targetElement.classList.add("week-date__selected");
    setTaskList();
  }
};
weekDiv.addEventListener("click", function (event) {
  weekClick(event);
});

//일정 삭제 함수

const deleteTask = function (event) {
  if (event.target.type === "checkbox") {
    let checkboxDiv = event.target.parentElement;
    let taskIndex = checkboxDiv.id;

    checkboxDiv.style.opacity = "0";

    setTimeout(function () {
      checkboxDiv.remove();
      setTaskList();
    }, 500);

    let date = parseInt(
      document.querySelector(".week-date__selected .week-date__num").innerText
    );
    let i = 0;
    for (i = 0; i < taskList[date].length; i++) {
      if ("index" + i === taskIndex) {
        taskList[date].splice(i, 1);
        break;
      }
    }
    if (taskList[date].length > 0) {
      for (let j = i; j < taskList[date].length; j++) {
        taskList[date][j].index = j;
      }
    }

    document.getElementById("task-counter").innerText =
      taskList[date].length + " tasks";
  }
};
document.body.addEventListener("change", function (event) {
  deleteTask(event);
});

//main
setWeek();
setTaskList();
