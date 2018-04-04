//helpers for todoRoutes
const db = require('../models');

exports.getTodos = (req, res) => {
db.Todo.find()
  .then((todos) => {
    res.json(todos);
  })
  .catch((err) => res.json(err))
}

exports.getTodoByID = (req, res) => {
db.Todo.findById(req.params.todoID)
  .then((todo) => {
    res.json(todo)
  })
  .catch((err) => {
    res.send(err);
  })
} 

exports.addTodo = (req, res) => {
db.Todo.create(req.body)
  .then((newTodo) => {
    res.status(201)
      .json(newTodo);
  })
  .catch((err) => {
    res.send(err);
  })
}

exports.updateTodoByID = (req,res) => {
  db.Todo.findOneAndUpdate(
    { _id: req.params.todoID },
    req.body,
    { new: true }
  )
  .then((todo) => {
    res.json(todo);
  })
  .catch((err) => {
    res.send(err);
  })
}

exports.deleteTodoByID = (req, res) => {
  db.Todo.deleteOne(
    { _id: req.params.todoID }
  )
  .then(() => {
    res.json(`${req.params.todoID} was removed`);
  })
  .catch((err) => {
    res.send(err);
  })
}

module.exports = exports;