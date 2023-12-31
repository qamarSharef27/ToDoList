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
            <input type="checkbox" id="checkbox-${index}" class="checkboxInput" data-index="${index}" ${task.completed ? "checked" : ""}>
            <label for="checkbox-${index}">${task.text}</label>
            <button class="ButtonEdit" aria-label="Edit Task"><i class="fa fa-edit"></i></button>
                <button class="ButtonDelete" aria-label="Delete Task"><i class="fa fa-trash"></i></button>

            `;
            taskList.appendChild(listItem);

            const deleteButton = listItem.querySelector(".ButtonDelete");
            deleteButton.addEventListener("click", () => {
                tasks.splice(index, 1);
                updateLocalStorage();
                renderTasks();
            });

            const editButton = listItem.querySelector(".ButtonEdit");
            editButton.addEventListener("click", () => {
                const textElement = listItem.querySelector("label");
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
            
        
            const checkbox = listItem.querySelector(".checkboxInput");
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





