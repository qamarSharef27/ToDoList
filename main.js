document.addEventListener("DOMContentLoaded", function () {
    const taskInput = document.getElementById("TaskClass");
    const addButton = document.getElementById("addButton");
    const taskList = document.getElementById("taskList");

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function updateLocalStorage() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function renderTasks() {
        taskList.innerHTML = "";

        tasks.forEach((task, index) => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
                <input type="checkbox" class="task-checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
                <span class="task-text">${task.text}</span>
                <button class="edit-button">Edit</button>
                <button class="delete-button">Delete</button>
            `;
            taskList.appendChild(listItem);

            const deleteButton = listItem.querySelector(".delete-button");
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            const editButton = listItem.querySelector(".edit-button");
            editButton.addEventListener("click", () => {
                const newText = prompt("Edit task:", task.text);
                if (newText !== null) {
                    tasks[index].text = newText;
                    updateLocalStorage();
                    renderTasks();
                }
            });

            const checkbox = listItem.querySelector(".task-checkbox");
            checkbox.addEventListener("change", (event) => {
                tasks[index].completed = event.target.checked;
                updateLocalStorage();
                renderTasks();
            });
        });
    }

    addButton.addEventListener("click", () => {
        const taskText = taskInput.value.trim();
        if (taskText !== "") {
            tasks.push({ text: taskText, completed: false });
            updateLocalStorage();
            renderTasks();
            taskInput.value = "";
        }
    });

    renderTasks();
});





