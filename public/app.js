const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('.list');

//parse entire todo list
const populateTodos = (data) => {
  data.forEach( (todo) => {
    postTodo(todo);  
  })
}

//add single todo to page
const postTodo = (todo) => {
  let listItem = document.createElement('li');
  let newTodo = `${todo.name} <span class="delete">X</span>`;
  
  listItem.innerHTML = newTodo;
  if(todo.completed){
    listItem.classList.add('completed')
  }

  todoList.appendChild(listItem);
}

//ping API for todos
const getTodos = () => {
  axios.get('/api/todos')
    .then((data) => {
      populateTodos(data.data)
    })
    .catch((err) => {
      console.log(err);
    })
}

//creat a new todo
const createTodo = () => {
  let inputVal = todoInput.value;
  axios.post('/api/todos', {
    name: inputVal
  })
  .then((newTodo) => {
    todoInput.value = "";
    postTodo(newTodo.data) 
  })
  .catch(err => console.log(err));
}

todoInput.addEventListener('keypress', (e) => {
  if(e.charCode === 13) {
    createTodo();
  }
})

todoList.addEventListener('click', () => {
  console.log('click')
});

window.addEventListener('load', getTodos);