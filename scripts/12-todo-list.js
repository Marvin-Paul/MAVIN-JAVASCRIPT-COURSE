 const todoList = [ {
name:'make dinner',
dueDate:'2022-05-23'
 } ,{
  name: 'wash dishes',
 dueDate:'2022-05-24'}
 ];

 // renderTodoList();


  function renderTodoList(){
    let todoListHTML ='';

    todoList.forEach((todoObject, index) => {
      const name = todoObject.name;
    const dueDate = todoObject.dueDate;


    const html = `
     <div>${name}</div>
     <div>${dueDate}</div> 
     <button 
     class="delete-todo-button js-delete-todo-button">Delete</button>
     `; 

    todoListHTML+= html;

    document.querySelectorAll('.js-delete-todo-button')
       .forEach((deleteButton,index) => {
        deleteButton.addEventListener('click',() =>{
            todoList.splice(index, 1);
        renderTodoList();

        });
       
y    });
  
   //console.log(todoListHTML);

     document.querySelector('.js-todo-list')
      .innerHTML = todoListHTML;
  document.querySelector('.js-delete-todo-list-grid')
  }

   document.querySelectorAll('.js-add-todo-button')
    .addEventListener('click', () => {
    addTodo();
    }); 
 


 function addTodo(){
    const inputElement = document
    .querySelector('.js-name-input');
    const name = inputElement.value;

   const dateInputElement = document.querySelector(
    '.js-due-date-input');
    const dueDate = dateInputElement.value

      todoList.push({
        name : name,
      dueDate:dueDate
 });
    // console.log(todoList);


     inputElement.value = '';
     renderTodoList();
 }
 