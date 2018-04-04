const todoInput = document.querySelector('.todoInput');
const todoList = document.querySelector('.list');

const populateTodos = (data) => {
  //console.log(data);
  data.forEach( (item, index) => {
    console.log(item);
    let listItem = document.createElement('li');
    listItem.innerHTML = item.name;
    todoList.appendChild(listItem);
  })
}
const getTodos = () => {
  axios.get('/api/todos')
    .then((data) => {
      populateTodos(data.data)
    })
    .catch((err) => {
      console.log(err);
    })
}


//document.querySelector('body').addEventListener('click', getTodos)

window.addEventListener('load', getTodos);