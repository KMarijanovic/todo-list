//Selectors
const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

//Event Listeners

//check if content of our web page is loaded
//if it is loaded, execute the function
document.addEventListener('DOMContentLoaded', getTodos);

todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
//1. BUG SOLUTION: ORIGINAL WAS TO LISTEN ON 'CLICK' but...
//it is better to listen for a 'change' on select fields
//it only triggers when you change option!
filterOption.addEventListener('change', filterTodo);

//Functions
function addTodo(event) {
    //Stop refreshing the page/prevent form form submitting
    event.preventDefault()
    //Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value; //adding text for new todo
    newTodo.classList.add('todo-item');
    todoDiv.appendChild(newTodo);
    //ADD TODO TO LOCAL STORAGE
    saveLocalTodos(todoInput.value);
    //CHECK MARK BUTTON
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    //TRASH BUTTON
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    //APPEND TO LIST/(generate new todo)
    todoList.appendChild(todoDiv);
    //Clear Todo INPUT VALUE
    todoInput.value = '';
}

function deleteCheck(e) {
    const item = e.target;
    //DELETE TODO
    if (item.classList[0] === 'trash-btn') {
        const todo = item.parentElement;
        //Animation
        todo.classList.add('fall');
        removeLocalTodos(todo);
        todo.addEventListener('transitionend', function () {
            todo.remove();
        });
    }

    //CHECK MARK
    if (item.classList[0] === 'complete-btn') {
        const todo = item.parentElement;
        todo.classList.toggle('completed');
        //2. BUG SOLUTION: after item is checked, update the screen!
        //move checked todo from unchecked list if you happen to check one while in unchecked list
        filterTodo();
    }
}

function filterTodo(e) {
    const todos = todoList.childNodes;
    //make sure what we click
    //because we use node list we can use forEach()
    todos.forEach(function (todo) {
        //option value from index.html
        //2. BUG SOLUTION: ORIGINAL was switch (e.target.value)
        //this will allow function filterTodo() to be called anytime, not only inside the 'change' event
        switch (filterOption.value) {
            case 'all':
                //show all of them
                todo.style.display = 'flex';
                break;
            case 'completed':
                if (todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
            case 'uncompleted':
                if (!todo.classList.contains('completed')) {
                    todo.style.display = 'flex';
                } else {
                    todo.style.display = 'none';
                }
                break;
        }
    });
}

//implementing the local storage to our app
//save todos to local storage
function saveLocalTodos(todo) {
    //CHECK Do I already have thing in there?
    let todos;
    //if there is nothing, make empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        //take it back/parse it back/create it into an arry
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    //grab and push it in the todos array
    todos.push(todo);
    //pushing it back to local storage/saving it
    localStorage.setItem('todos', JSON.stringify(todos));
}

//be able to remove todos from the local storage
function getTodos() {
    //CHECK Do I already have thing in there?
    let todos;
    //if there is nothing, make empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        //take it back/parse it back/create it into an arry
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //if we have, we loop over them
    todos.forEach(function (todo) {
        //Todo DIV
        const todoDiv = document.createElement('div');
        todoDiv.classList.add('todo');
        //Create LI
        const newTodo = document.createElement('li');
        newTodo.innerText = todo; //value is from local storage
        newTodo.classList.add('todo-item');
        todoDiv.appendChild(newTodo);
        //CHECK MARK BUTTON
        const completedButton = document.createElement('button');
        completedButton.innerHTML = '<i class="fas fa-check"></i>';
        completedButton.classList.add('complete-btn');
        todoDiv.appendChild(completedButton);
        //TRASH BUTTON
        const trashButton = document.createElement('button');
        trashButton.innerHTML = '<i class="fas fa-trash"></i>';
        trashButton.classList.add('trash-btn');
        todoDiv.appendChild(trashButton);
        //APPEND TO LIST/(generate new todo)
        todoList.appendChild(todoDiv);
    })
}

//Remove local storage todos
function removeLocalTodos(todo) {
    //CHECK Do I already have thing in there?
    let todos;
    //if there is nothing, make empty array
    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        //take it back/parse it back/create it into an arry
        todos = JSON.parse(localStorage.getItem('todos'));
    }
    //get the index of todo!
    //clicking on delete is actually clicking on the DIV
    //todo is DIV and we navigate all the way down to the text
    const todoIndex = todo.children[0].innerText;
    //we're checking the index of one specific element
    //from what position you want to remove the element
    //1 is for how many elements do you want to remove
    todos.splice(todos.indexOf(todoIndex), 1);
    //remove from the local storage
    localStorage.setItem('todos', JSON.stringify(todos));
}