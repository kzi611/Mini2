interface Todo {
    id: number;
    content: string;
    completed: boolean;
  }
  
  let todos: Todo[] = [];
  let todoId: number = 0;
  
  const todoInput: HTMLInputElement = document.getElementById('todo-input') as HTMLInputElement;
  const addTodoButton: HTMLButtonElement = document.getElementById('add-todo') as HTMLButtonElement;
  const todoList: HTMLUListElement = document.getElementById('todo-list') as HTMLUListElement;
  
  function addTodo(): void {
    const content: string = todoInput.value.trim();
    if (content) {
      const newTodo: Todo = {
        id: todoId++,
        content: content,
        completed: false,
      };
      todos.push(newTodo);
      renderTodos();
      todoInput.value = '';
    }
  }
  
  function renderTodos(): void {
    todoList.innerHTML = '';
    todos.forEach(todo => {
      const li: HTMLLIElement = document.createElement('li');
      li.classList.add('todo-item');
      if (todo.completed) {
        li.classList.add('completed');
      }
      li.setAttribute('data-id', todo.id.toString());
      li.addEventListener('click', () => toggleTodoCompletion(todo.id));
      
      const todoContent: HTMLSpanElement = document.createElement('span');
      todoContent.textContent = todo.content;
  
      const editInput: HTMLInputElement = document.createElement('input');
      editInput.type = 'text';
      editInput.value = todo.content;
      editInput.id = `edit-input-${todo.id}`;
      editInput.style.display = 'none';
  
      const editButton: HTMLButtonElement = document.createElement('button');
      editButton.classList.add('btn-edit');
      editButton.textContent = 'Edit';
      editButton.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        toggleEditMode(todo.id);
      });
  
      const saveButton: HTMLButtonElement = document.createElement('button');
      saveButton.classList.add('btn-save');
      saveButton.textContent = 'Save';
      saveButton.style.display = 'none';
      saveButton.addEventListener('click', (e: MouseEvent) => {
        e.stopPropagation();
        save(todo.id);
      });
  
      const deleteButton: HTMLButtonElement = document.createElement('button');
      deleteButton.classList.add('btn-delete');
      deleteButton.textContent = 'Delete';
      deleteButton.addEventListener('click', (e: MouseEvent) => {
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
  
  function toggleTodoCompletion(id: number): void {
    const todo: Todo | undefined = todos.find(todo => todo.id === id);
    if (todo) {
      todo.completed = !todo.completed;
      renderTodos();
    }
  }
  
  function deleteTodo(id: number): void {
    todos = todos.filter(todo => todo.id !== id);
    renderTodos();
  }
  
  function toggleEditMode(id: number): void {
    const todoContent: HTMLSpanElement | null = document.querySelector(`.todo-item[data-id='${id}'] span`);
    const editInput: HTMLInputElement | null = document.getElementById(`edit-input-${id}`) as HTMLInputElement;
    const editButton: HTMLButtonElement | null = document.querySelector(`.todo-item[data-id='${id}'] .btn-edit`);
    const saveButton: HTMLButtonElement | null = document.querySelector(`.todo-item[data-id='${id}'] .btn-save`);
  
    if (todoContent && editInput && editButton && saveButton) {
      todoContent.style.display = 'none';
      editInput.style.display = 'inline';
      editInput.focus();
      editButton.style.display = 'none';
      saveButton.style.display = 'inline';
    }
  }
  
  function save(id: number): void {
    const todo: Todo | undefined = todos.find(todo => todo.id === id);
    const editedInput: HTMLInputElement | null = document.getElementById(`edit-input-${id}`) as HTMLInputElement;
    if (todo && editedInput) {
      todo.content = editedInput.value.trim();
      renderTodos();
    }
  }
  
  addTodoButton.addEventListener('click', addTodo);
  todoInput.addEventListener('keypress', (e: KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  });  