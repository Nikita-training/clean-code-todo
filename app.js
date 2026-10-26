//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById("new-task"); //Add a new task.
const addButton = document.getElementsByTagName("button")[0]; //first button
const todoTaskList = document.getElementById("incompleteTasks"); //ul of #incompleteTasks
const completedTasksList = document.getElementById("completed-tasks"); //completed-tasks

//New task list item
const createTaskElement = function (taskText) {
  const taskElement = document.createElement("li");

  //input (checkbox)
  const checkBox = document.createElement("input"); //checkbx
  //label
  const label = document.createElement("label"); //label
  //input (text)
  const editInput = document.createElement("input"); //text
  //button.edit
  const editButton = document.createElement("button"); //edit button

  //button.delete
  const deleteButton = document.createElement("button"); //delete button
  const deleteButtonImg = document.createElement("img"); //delete button image

  label.innerText = taskText;
  label.className = "task";

  //Each elements, needs appending
  checkBox.type = "checkbox";
  editInput.type = "text";
  editInput.className = "task";

  editButton.innerText = "Edit"; //innerText encodes special characters, HTML does not.
  editButton.className = "edit";

  deleteButton.className = "delete";
  deleteButtonImg.src = "./remove.svg";
  deleteButton.appendChild(deleteButtonImg);

  //and appending.
  taskElement.appendChild(checkBox);
  taskElement.appendChild(label);
  taskElement.appendChild(editInput);
  taskElement.appendChild(editButton);
  taskElement.appendChild(deleteButton);
  return taskElement;
};

const addTask = function () {
  //Create a new list item with the text from the #new-task:
  if (!newTaskInput.value) return;
  const taskElement = createTaskElement(newTaskInput.value);

  //Append taskElement to todoTaskList
  todoTaskList.appendChild(taskElement);
  bindTaskEvents(taskElement, taskCompleted);

  newTaskInput.value = "";
};

//Edit an existing task.

const editTask = function () {
  const taskElement = this.parentNode;

  const editInput = taskElement.querySelector("input[type=text]");
  const label = taskElement.querySelector("label");
  const editBtn = taskElement.querySelector(".edit");
  const isEditMode = taskElement.classList.contains("editMode");
  //If class of the parent is .editmode
  if (isEditMode) {
    //switch to .editmode
    //label becomes the inputs value.
    label.innerText = editInput.value;
    editBtn.innerText = "Edit";
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = "Save";
  }

  //toggle .editmode on the parent.
  taskElement.classList.toggle("editMode");
};

//Delete task.
const deleteTask = function () {
  const taskElement = this.parentNode;
  const ul = taskElement.parentNode;
  //Remove the parent list item from the ul.
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

//The glue to hold it all together.

//Set the click handler to the addTask function.
addButton.addEventListener("click", addTask);

const bindTaskEvents = function (taskElement, toggleStatusHandler) {
  //select ListItems children
  const checkBox = taskElement.querySelector("input[type=checkbox]");
  const editButton = taskElement.querySelector("button.edit");
  const deleteButton = taskElement.querySelector("button.delete");

  //Bind editTask to edit button.
  editButton.onclick = editTask;
  //Bind deleteTask to delete button.
  deleteButton.onclick = deleteTask;
  //Bind taskCompleted to toggleStatusHandler.
  checkBox.onchange = toggleStatusHandler;
};

//cycle over todoTaskList ul list items
//for each list item
const bindInitialEvents = function (list, handler) {
  Array.from(list.children).forEach(function (child) {
    bindTaskEvents(child, handler);
  });
};
bindInitialEvents(todoTaskList, taskCompleted);
bindInitialEvents(completedTasksList, taskIncomplete);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
