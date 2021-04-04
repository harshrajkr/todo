//Selector
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const todoFilter = document.querySelector('.filter-todo');

//Event listener
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
todoFilter.addEventListener('click', filterTodo);

//Functions


//funciton 1 from event listner 1
function addTodo(event) {
    //prevent form from submitting
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);


    //add todo to localstorage
    saveLocalTodos(todoInput.value);


    //checked button
    const completedBtn = document.createElement('button');
    // completedBtn.innerText = "<i class="fas fa-check"></i>"
    //This won't work
    completedBtn.innerHTML = '<i class="fas fa-check"></i>';
    completedBtn.classList.add("complete-btn");
    todoDiv.appendChild(completedBtn);

    //delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("delete-btn");
    todoDiv.appendChild(deleteBtn);


    //now we'll add this whole to the main todoList
    todoList.appendChild(todoDiv);
    //clear the value of the todo Input
    todoInput.value = null;
}


//funtions 2 for event listner 2
function deleteCheck(e) {
    // console.log(e);
    // console.log(e.target);
    const item = e.target;
    const todo = item.parentElement;
    //delete todo
    if (item.classList[0] === "delete-btn") {

        //Animation
        todo.classList.add("fall");
        // todo.remove();
        //It won't work

        //REMOVE TODOS FROM LOCAL STORAGE
        removeLocalTodos(todo);


        //Instead
        todo.addEventListener("transitionend", function () {
            todo.remove();
        });
    }

    //check mark
    if (item.classList[0] === "complete-btn") {
        todo.classList.toggle("completed");
    }
}


//function 3 for event Listner 3
function filterTodo(e) {
    const todos = todoList.childNodes;
    // console.log(todos);
    todos.forEach(function (todos) {
        switch (e.target.value) {
            case "all":
                todos.style.display = "flex";
                break;
            case "completed":
                if (todos.classList.contains("completed")) {
                    todos.style.display = "flex";
                }
                else {
                    todos.style.display = "none";
                }
                break;
            case "uncompleted":
                if (!todos.classList.contains("completed")) {
                    todos.style.display = "flex";
                }
                else {
                    todos.style.display = "none";
                }
                break;
        }
    });
}


//function 4 to save this todo to local files
function saveLocalTodos(todo) {
    //check --- to check that if the local storage already have a todos
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}


function getTodos() {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.forEach(function (todo) {
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement('li');
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
        const completedBtn = document.createElement('button');
        completedBtn.innerHTML = '<i class="fas fa-check"></i>';
        completedBtn.classList.add("complete-btn");
        todoDiv.appendChild(completedBtn);
        const deleteBtn = document.createElement('button');
        deleteBtn.innerHTML = '<i class="fas fa-trash"></i>';
        deleteBtn.classList.add("delete-btn");
        todoDiv.appendChild(deleteBtn);
        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if (localStorage.getItem('todos') === null) {
        todos = [];
    }
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    //console.log(todo.children[0].innerText);
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);

    //what you want to remove, how many you want to remove

    //now pushing back this array of strings to the local storage
    localStorage.setItem("todos", JSON.stringify(todos));
}