const taskInput = document.getElementById("taskInput");
const taskDate = document.getElementById("taskDate");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <div class="task-row">
        <span class="${task.completed ? 'completed' : ''}" onclick="toggleComplete(${index})">
          ${task.text} ${task.date ? "📅 " + task.date : ""}
        </span>
        <div class="actions">
          <button class="edit-btn" onclick="editTask(${index})">Edit</button>
          <button onclick="deleteTask(${index})">X</button>
        </div>
      </div>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  const date = taskDate.value;

  if (!text) return;

  tasks.push({
    text,
    date,
    completed: false
  });

  taskInput.value = "";
  taskDate.value = "";

  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null) {
    tasks[index].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

// Enter key support
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") addTask();
});

// Initial render
renderTasks();