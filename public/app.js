const todoInput = document.querySelector('#todoInput');
const todoList = document.querySelector('.list');

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

//parse initial API data
const populateTodos = (data) => {
  data.forEach( (todo) => {
    postTodo(todo);  
  })
}

//add a single todo to page
//consider using a different method for storing _id
// using data attributes results in dirtier DOM
const postTodo = (todo) => {
  let listItem = document.createElement('li');
  
  //data attribute used for API 
  listItem.setAttribute('data-ID', todo._id);
  let newTodo = `${todo.name} <span class="delete">X</span>`;
  
  listItem.innerHTML = newTodo;
  if(todo.completed){
    listItem.classList.add('completed')
  }

  todoList.appendChild(listItem);
}


//POST a new todo
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

//API call to delete item
const deleteTodo = todo => {
  let ID = todo.getAttribute('data-ID');
  axios.delete(`/api/todos/${ID}`)
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

//API call to update completed status
const updateStatus = (todo, status) => {
  let ID = todo.getAttribute('data-ID');
  
  axios.put(`/api/todos/${ID}`, {
    completed: `${status}`
  })
  .then(res => {
    console.log(res);
    status ? todo.classList.add('completed') : todo.classList.remove('completed');
  })
  .catch(err => console.log(err))

}

//handle entries
todoInput.addEventListener('keypress', (e) => {
  if(e.charCode === 13) {
    createTodo();
  }
})

//main event handler - refactor?
todoList.addEventListener('click', (e) => {
  let todo = e.target;

  //handle todo deletions
  if(todo.className === 'delete') {
    todo.parentElement.parentElement.removeChild(todo.parentElement);

    deleteTodo(todo.parentElement);
  }

  //handle todo status updates
  if(todo.parentElement.className === 'list') {
    todo.classList.length === 0 
      ? updateStatus(todo, true) 
      : updateStatus(todo, false)
  }
}
);

//populate list on window load
window.addEventListener('load', getTodos);