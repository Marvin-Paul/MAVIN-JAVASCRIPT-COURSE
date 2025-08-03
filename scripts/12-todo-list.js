 const todoList = [
      { name: 'Complete project proposal', dueDate: '2023-10-15' },
      { name: 'Buy groceries', dueDate: '2023-10-12' }
    ];

    // Initial render
    renderTodoList();

    function renderTodoList() {
      let todoListHTML = '';
      const todoListGrid = document.querySelector('.js-todo-list-grid');
      
      // If there are no todos, show empty state
      if (todoList.length === 0) {
        todoListHTML = `
          <div class="empty-state">
            <div>📋</div>
            <h3>No tasks yet</h3>
            <p>Add your first task to get started!</p>
          </div>
        `;
      } else {
        // Generate HTML for each todo
        todoList.forEach((todoObject, index) => {
          const { name, dueDate } = todoObject;
          todoListHTML += `
            <div class="todo-item">
              <div>${name}</div>
              <div>${dueDate}</div>
              <button class="delete-todo-button js-delete-todo-button" 
                      data-todo-index="${index}">
                Delete
              </button>
            </div>
          `;
        });
      }
      
      // Update task count
      document.querySelector('.js-todo-count').textContent = 
        `${todoList.length} ${todoList.length === 1 ? 'task' : 'tasks'}`;
      
      // Render to DOM
      todoListGrid.innerHTML = todoListHTML;
      
      // Add event listeners to delete buttons
      document.querySelectorAll('.js-delete-todo-button').forEach(deleteButton => {
        deleteButton.addEventListener('click', () => {
          const index = parseInt(deleteButton.dataset.todoIndex);
          todoList.splice(index, 1);
          renderTodoList();
        });
      });
    }

    // Add event listener to the add button
    document.querySelector('.js-add-todo-button').addEventListener('click', addTodo);

    // Also allow adding with Enter key
    document.querySelector('.js-name-input').addEventListener('keypress', (e) => {
      if (e.key === 'Enter') addTodo();
    });

    function addTodo() {
      const nameInput = document.querySelector('.js-name-input');
      const dateInput = document.querySelector('.js-due-date-input');
      
      const name = nameInput.value.trim();
      const dueDate = dateInput.value;
      
      // Validate input
      if (!name) {
        alert('Please enter a task name');
        nameInput.focus();
        return;
      }
      
      if (!dueDate) {
        alert('Please select a due date');
        dateInput.focus();
        return;
      }
      
      // Add to the list
      todoList.push({ name, dueDate });
      
      // Clear inputs
      nameInput.value = '';
      dateInput.value = '';
      nameInput.focus();
      
      // Re-render the list
      renderTodoList();
    }