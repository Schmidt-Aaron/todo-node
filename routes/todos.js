const express = require('express');
const router = express.Router();
const db = require('../models');
const helpers = require('../helpers/routes')

router.route('/')
  .get(helpers.getTodos)
  .post(helpers.addTodo)

router.route('/:todoID')
  .get(helpers.getTodoByID)
  .put(helpers.updateTodoByID)
  .delete(helpers.deleteTodoByID)

module.exports = router;