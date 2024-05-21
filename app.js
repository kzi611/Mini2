"use strict";
let todos = [];
let todoId = 0;
const todoInput = document.getElementById('todo-input');
const addTodoButton = document.getElementById('add-todo');
const todoList = document.getElementById('todo-list');
function addTodo() {
    const content = todoInput.value.trim();
    if (content) {
        const newTodo = {
            id: todoId++,
            content: content,
            completed: false,
        };
        todos.push(newTodo);
        renderTodos();
        todoInput.value = '';
    }
}
function renderTodos() {
    todoList.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.classList.add('todo-item');
        if (todo.completed) {
            li.classList.add('completed');
        }
        li.setAttribute('data-id', todo.id.toString());
        li.addEventListener('click', () => toggleTodoCompletion(todo.id));
        const todoContent = document.createElement('span');
        todoContent.textContent = todo.content;
        const editInput = document.createElement('input');
        editInput.type = 'text';
        editInput.value = todo.content;
        editInput.id = `edit-input-${todo.id}`;
        editInput.style.display = 'none';
        const editButton = document.createElement('button');
        editButton.classList.add('btn-edit');
        editButton.textContent = 'Edit';
        editButton.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleEditMode(todo.id);
        });
        const saveButton = document.createElement('button');
        saveButton.classList.add('btn-save');
        saveButton.textContent = 'Save';
        saveButton.style.display = 'none';
        saveButton.addEventListener('click', (e) => {
            e.stopPropagation();
            save(todo.id);
        });
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('btn-delete');
        deleteButton.textContent = 'Delete';
        deleteButton.addEventListener('click', (e) => {
            e.stopPropagation();
            deleteTodo(todo.id);
        });
        li.appendChild(todoContent);
        li.appendChild(editInput);
        li.appendChild(editButton);
        li.appendChild(saveButton);
        li.appendChild(deleteButton);
        todoList.appendChild(li);
    });
}
function toggleTodoCompletion(id) {
    const todo = todos.find(todo => todo.id === id);
    if (todo) {
        todo.completed = !todo.completed;
        renderTodos();
    }
}
function deleteTodo(id) {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
}
function toggleEditMode(id) {
    const todoContent = document.querySelector(`.todo-item[data-id='${id}'] span`);
    const editInput = document.getElementById(`edit-input-${id}`);
    const editButton = document.querySelector(`.todo-item[data-id='${id}'] .btn-edit`);
    const saveButton = document.querySelector(`.todo-item[data-id='${id}'] .btn-save`);
    if (todoContent && editInput && editButton && saveButton) {
        todoContent.style.display = 'none';
        editInput.style.display = 'inline';
        editInput.focus();
        editButton.style.display = 'none';
        saveButton.style.display = 'inline';
    }
}
function save(id) {
    const todo = todos.find(todo => todo.id === id);
    const editedInput = document.getElementById(`edit-input-${id}`);
    if (todo && editedInput) {
        todo.content = editedInput.value.trim();
        renderTodos();
    }
}
addTodoButton.addEventListener('click', addTodo);
todoInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});
