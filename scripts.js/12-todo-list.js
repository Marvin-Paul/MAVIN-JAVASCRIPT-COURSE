const todoList = [];

function addTodo() {
  const inputElement = document.querySelector('.js-name-input');
  const todoName = inputElement.value;
  if (todoName) {
    todoList.push(todoName);
    inputElement.value = '';
  }
}