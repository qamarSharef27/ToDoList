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
                <input type="checkbox" class="checkbox" data-index="${index}" ${task.completed ? "checked" : ""}>
                <span class="taskText">${task.text}</span>
                <button class="editButton"><i class="fa fa-edit"></i></button>
                <button class="deleteButton"><i class="fa fa-trash"></i></button>

            `;
            taskList.appendChild(listItem);

            const deleteButton = listItem.querySelector(".deleteButton");
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            const editButton = listItem.querySelector(".editButton");
            editButton.addEventListener("click", () => {
                const textElement = listItem.querySelector(".taskText");
                const inputElement = document.createElement("input");
                inputElement.type = "text";
                inputElement.value = textElement.textContent;
            
                inputElement.addEventListener("keyup", (event) => {
                    if (event.key === "Enter") {
                        const newText = inputElement.value.trim();
                        if (newText !== "") {
                            tasks[index].text = newText;
                            updateLocalStorage();
                            renderTasks();
                        }
                    } else if (event.key === "Escape") {
                        renderTasks(); 
                    }
                });
            
                textElement.replaceWith(inputElement);
                inputElement.focus();
            });            
            
        
            const checkbox = listItem.querySelector(".checkbox");
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





