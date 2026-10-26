const newTaskInput = document.getElementById("new-task");
const addButton = document.getElementsByTagName("button")[0];
const todoTaskList = document.getElementById("incompleteTasks");
const completedTasksList = document.getElementById("completed-tasks");

const createTaskElement = function (taskText) {
  const taskElement = document.createElement("li");

  const checkBox = document.createElement("input");

  const label = document.createElement("label");

  const editInput = document.createElement("input");

  const editButton = document.createElement("button");

  const deleteButton = document.createElement("button");
  const deleteButtonImg = document.createElement("img");

  label.innerText = taskText;
  label.className = "task";

  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  taskElement.append(checkBox, label, editInput, editButton, deleteButton);
  return taskElement;
};

const addTask = function () {
  if (!newTaskInput.value) return;
  const taskElement = createTaskElement(newTaskInput.value);

  todoTaskList.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  newTaskInput.value = "";
};

const editTask = function () {
  const taskElement = this.parentNode;

  const editInput = taskElement.querySelector("input[type=text]");
  const label = taskElement.querySelector("label");
  const editBtn = taskElement.querySelector(".edit");
  const isEditMode = taskElement.classList.contains("editMode");
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  taskElement.classList.toggle("editMode");
};

const deleteTask = function () {
  const taskElement = this.parentNode;
  const ul = taskElement.parentNode;
  ul.removeChild(taskElement);
};

const moveTask = function (targetList, nextHandler) {
  const taskElement = this.parentNode;
  targetList.appendChild(taskElement);
  bindTaskEvents(taskElement, nextHandler);
};

const taskCompleted = function () {
  moveTask.call(this, completedTasksList, taskIncomplete);
};

const taskIncomplete = function () {
  moveTask.call(this, todoTaskList, taskCompleted);
};

addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskElement, toggleStatusHandler) {
  const checkBox = taskElement.querySelector("input[type=checkbox]");
  const editButton = taskElement.querySelector("button.edit");
  const deleteButton = taskElement.querySelector("button.delete");

  editButton.onclick = editTask;
  deleteButton.onclick = deleteTask;
  checkBox.onchange = toggleStatusHandler;
};

const bindInitialEvents = function (list, handler) {
  Array.from(list.children).forEach(function (child) {
    bindTaskEvents(child, handler);
  });
};
bindInitialEvents(todoTaskList, taskCompleted);
bindInitialEvents(completedTasksList, taskIncomplete);
