const todos = [];
const RENDER_EVENT = 'render-todo';

document.addEventListener('DOMContentLoaded', function () {
    const submitForm = document.getElementById('form'); // Sesuai dengan ID di HTML
    submitForm.addEventListener('submit', function (event) {
        event.preventDefault();
        addTodo();
    });
});

function addTodo() {
    const textTodo = document.getElementById('title').value; // Sesuai dengan ID di HTML
    const timestamp = document.getElementById('date').value;
    
    const generatedID = +new Date();
    const todoObject = {
        id: generatedID,
        task: textTodo,
        timestamp: timestamp,
        isCompleted: false
    };
    
    todos.push(todoObject);
    document.dispatchEvent(new Event(RENDER_EVENT));
}

function makeTodo(todoObject) {
    const textTitle = document.createElement('h2');
    textTitle.innerText = todoObject.task;
   
    const textTimestamp = document.createElement('p');
    textTimestamp.innerText = todoObject.timestamp;
   
    const textContainer = document.createElement('div');
    textContainer.classList.add('inner');
    textContainer.append(textTitle, textTimestamp);
   
    const container = document.createElement('div');
    container.classList.add('item', 'shadow');
    container.append(textContainer);
    container.setAttribute('id', `todo-${todoObject.id}`);
   
    return container;
}

document.addEventListener(RENDER_EVENT, function () {
    const uncompletedTODOList = document.getElementById('todos');
    uncompletedTODOList.innerHTML = '';
   
    for (const todoItem of todos) {
        const todoElement = makeTodo(todoItem);
        uncompletedTODOList.append(todoElement);
    }
});