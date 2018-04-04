const mongoose = require('mongoose');

//fail gracefully
mongoose.set('debug', true);

mongoose.connect('mongodb://localhost:27017/simple-todo');

mongoose.Promise = Promise;

module.exports.Todo = require('./todo');