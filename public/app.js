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

//add single todo to page
const postTodo = (todo) => {
  let listItem = document.createElement('li');
  listItem.setAttribute('data-ID', todo._id);
  let newTodo = `${todo.name} <span class="delete">X</span>`;
  
  listItem.innerHTML = newTodo;
  if(todo.completed){
    listItem.classList.add('completed')
  }

  todoList.appendChild(listItem);
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

//handle entries
todoInput.addEventListener('keypress', (e) => {
  if(e.charCode === 13) {
    createTodo();
  }
})

//handle item deletions
todoList.addEventListener('click', (e) => {
  if(e.target.className === 'delete') {
    e.target.parentElement.parentElement.removeChild(e.target.parentElement);

    deleteTodo(e.target.parentElement);
  }
});

//API call to delete item
const deleteTodo = todo => {
  let ID = todo.getAttribute('data-ID');
  axios.delete(`/api/todos/${ID}`)
  .then(res => console.log(res))
  .catch(err => console.log(err));
}

//populate list on window load
window.addEventListener('load', getTodos);