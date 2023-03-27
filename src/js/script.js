const headerDate = document.querySelector("[data-date]");
const taskList = document.querySelector("[data-task-list]");
const newTaskInput = document.querySelector("[data-task-input]");
const emptyNote = document.querySelector("[data-empty-note]");

let taskItems = {};
let taskCompleteBtns = {};
let taskRemoveBtns= {};

const date = new Date();

const getMonth = (month) => {
    switch (month) {
      case 0:
        return "Jan";
      case 1:
        return "Feb";
      case 2:
        return "Mar";
      case 3:
        return "Apr";
      case 4:
        return "May";
      case 5:
        return "Jun";
      case 6:
        return "Jul";
      case 7:
        return "Aug";
      case 8:
        return "Sep";
      case 9:
        return "Oct";
      case 10:
        return "Nov";
      case 11:
        return "Dec";
      default:
        return "Invalid month";
    }
  }

const getWeekDay = (day) => {
  switch (day) {
    case 0:
      return "Sunday";
    case 1:
      return "Monday";
    case 2:
      return "Tuesday";
    case 3:
      return "Wednesday";
    case 4:
      return "Thursday";
    case 5:
      return "Friday";
    case 6:
      return "Satureday";
    default:
      return "Invalid day";
  }
}

const weekDay = getWeekDay(date.getDay());
const month = getMonth(date.getMonth());
const day = date.getDate();

headerDate.textContent = `${month} ${day}, ${weekDay}`;

const createTaskNode = (taskText) => {
  const newtaskItems = document.createElement("li");
  newtaskItems.classList.add("task-item");
  newtaskItems.setAttribute("data-task-item", "");
  newtaskItems.innerHTML = `
    <button class="item-icon" data-task-complete>
      <span class="check-icon"></span>
    </button>
    <p class="item-text">${taskText}</p>
    <button class="item-action-btn" data-task-remove>
      <ion-icon name="trash-outline" aria-hidden="true"></ion-icon>
    </button>
  `;
  return newtaskItems;
}

const newTaskInputValidation = (taskIsValid) => {
  if (taskIsValid) {
    if (taskList.childElementCount > 0) {
      taskList.insertBefore(createTaskNode(newTaskInput.value), taskItems[0]);
    } else {
      taskList.appendChild(createTaskNode(newTaskInput.value));
    }
    newTaskInput.value = "";
    emptyNote.classList.add("hide");
    taskItems = document.querySelectorAll("[data-task-item]");
    taskRemoveBtns = document.querySelectorAll("[data-task-remove]");
    taskCompleteBtns = document.querySelectorAll("[data-task-complete]");
  }
}

const completeTask = function () {
  const parentElem = this.parentElement;
  parentElem.classList.toggle("complete");
}

const removeTask = function () { 
  const parentElem = this.parentElement;
  parentElem.remove();
  toggleEmptyNote(); 
}

const toggleEmptyNote = () => {
  if (taskList.childElementCount > 0) {
    emptyNote.classList.add("hide");
  } else {
    emptyNote.classList.remove("hide");
  }
}

const addTask = () => {
  newTaskInputValidation(newTaskInput.value);
  for (let i = 0; i < taskRemoveBtns.length; i++) {
    taskRemoveBtns[i].addEventListener("click", removeTask);
  }
  for (let i = 0; i < taskCompleteBtns.length; i++) {
    taskCompleteBtns[i].addEventListener("click", completeTask);
  }
}

newTaskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});