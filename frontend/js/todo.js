// fetch all todos

// loader 
let loader = document.getElementById('loader');
loader.style.display = "block";

// loading 
let elements = document.documentElement;
let themeIcon = document.getElementById('themeButton');
let todoList = document.getElementById('todoList');
let completedTodoList = document.getElementById('completedTodosList');
let deltetedTodoList = document.getElementById('deletedTodosList');

let todoCount = document.getElementById('todoCount');
let completedCount = document.getElementById('completedCount');
let deletedCount = document.getElementById('deletedCount');

function getAllTodos() {
    loader.style.display = "block";
    fetch('/api/todos')
        .then(function(res) {

            return res.json();
        })
        .then(res => {
            let data = res.data;
            let todos = "",
                completedTodos = "",
                deletedTodos = "";
            let nOfCompleted = 0,
                noOfDeleted = 0,
                noOfPending = 0;

            todoCount.innerHTML = data.length;
            data.forEach(e => {
                if (e.isDelted) {
                    noOfDeleted += 1;
                    deletedTodos += `<li class="list-group-item d-flex justify-content-between align-items-center">${e.taskName}</li>\n`;
                } else if (e.isCompleted) {
                    completedTodos += `<li class="list-group-item d-flex justify-content-between align-items-center">${e.taskName}</li>\n`;
                    nOfCompleted += 1;
                } else {
                    noOfPending += 1;
                    todos += `<li class="list-group-item d-flex justify-content-between align-items-center">${e.taskName}</li>\n`;
                }
            });

            todoList.innerHTML = todos;
            todoCount.innerHTML = noOfPending;

            completedTodoList.innerHTML = completedTodos;
            completedCount.innerHTML = nOfCompleted;

            deltetedTodoList.innerHTML = deletedTodos;
            deletedCount.innerHTML = noOfDeleted;

            loader.style.display = "none";
        });
}

document.addEventListener("DOMContentLoaded", function() {
    getAllTodos();
});
// change Theme
let light = true;

function setTheme() {
    if (light) {
        elements.setAttribute('data-bs-theme', 'dark');
        themeIcon.innerHTML = '<i class = "fas fa-sun fa-lg fa-fw" id = "themeIcon" > < /i>';
    } else {
        elements.setAttribute('data-bs-theme', 'light');
        themeIcon.innerHTML = '<i class = "fas fa-moon fa-lg fa-fw" id = "themeIcon" > < /i>';
    }
    light = !light;
    console.log("hi'");
}