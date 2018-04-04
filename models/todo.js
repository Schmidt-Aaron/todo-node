const mongoose = require('mongoose');
const todoSchema = new mongoose.Schema({
  name: { 
    type: String,
    required: 'Task cannot be blank!',
  },
  completed:  {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now(),
  },

})

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;