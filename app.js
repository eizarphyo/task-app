// var tasks = [];

window.onload = function () {
    if (localStorage.getItem("tasks") == null) {
        localStorage.setItem("tasks", JSON.stringify([]));
        return;
    } else {
        var tasks = JSON.parse(localStorage.getItem("tasks"));
        var activeTasks = tasks.filter((task) => !task.check);
        displayTasks(activeTasks);
    }
}

function addNewTask() {
    const taskDesc = document.getElementById("new-task").value;

    const newTask = {
        id: 12,
        desc: taskDesc,
        check: document.getElementById("new-task").checked
    }
    const tasks = localStorage.getItem('tasks');

    var tasksArr = tasks != undefined ? JSON.parse(tasks) : [];
    tasksArr.push(newTask);

    localStorage.setItem('tasks', JSON.stringify(tasksArr));
    displayTasks(tasksArr);

    document.getElementById("new-task").value = "";
    document.getElementById("new-task").focus();
}

function displayTasks(tasks) {
    // localStorage.setItem('tasks', JSON.stringify(tasks));
    // tasks = JSON.parse(localStorage.getItem('tasks'));

    var newTasks = "";
    tasks.forEach(task => {
        newTasks += `<div class="task">
        <input type="checkbox" name="task-name" ${task.check ? "checked" : ""} onclick="handleCheckboxClick(this)"/>
        <label for="task-name" 
        style="text-decoration: ${task.check ? "line-through" : ""}; 
        color: ${task.check ? "gray" : "black"}"
        >${task.desc}</label>
        <i class="fa fa-trash-o" aria-hidden="true" 
        onclick="deleteTask(this)"></i>
        </div>`;
    });
    document.getElementsByClassName("tasks")[0].innerHTML = newTasks;
}

function handleCheckboxClick(evt) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    // change design
    if (evt.checked) {
        evt.nextElementSibling.style.cssText = 'text-decoration: line-through; color: gray;';

    } else {
        evt.nextElementSibling.style.cssText = 'text-decoration: ""; color: black;';
    }

    var i = tasks.findIndex((task) => task.desc === evt.nextElementSibling.textContent);

    var task = tasks.at(i);
    task.check = evt.checked;

    // splice and replace
    tasks.splice(i, 1, task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayActiveTasks();
}

function handleTabClick(btnId) {
    changeStyle(btnId);

    var tasks = JSON.parse(localStorage.getItem('tasks'));
    if (btnId == 'btn-active') {
        // var activeTasks = tasks.filter((task) => !task.check);
        // displayTasks(activeTasks);
        displayActiveTasks();
    } else if (btnId == 'btn-completed') {
        var completedTasks = tasks.filter((task) => task.check);
        displayTasks(completedTasks);
    } else {
        displayTasks(tasks);
    }
}

function displayActiveTasks() {
    var tasks = JSON.parse(localStorage.getItem('tasks'));
    var activeTasks = tasks.filter((task) => !task.check);
    displayTasks(activeTasks);
}

function changeStyle(btnId) {
    var tabs = document.getElementsByClassName('tab');

    for (var i = 0; i < tabs.length; i++) {
        if (tabs.item(i).id === btnId) {
            document.getElementById(tabs.item(i).id).style.cssText = "font-weight: bold; text-decoration: underline";
        } else {
            document.getElementById(tabs.item(i).id).style.cssText = "font-weight: 500; text-decoration: none";
        }
    }
}

function deleteTask(evt) {
    var tasks = JSON.parse(localStorage.getItem('tasks'));

    var i = tasks.findIndex((task) => task.desc === evt.previousElementSibling.textContent);

    tasks.splice(i, 1);

    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks(tasks);
}