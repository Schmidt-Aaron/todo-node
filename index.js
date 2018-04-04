const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser');
const routes = require('./routes/todos')

//set up static files
app.use(express.static('public'));

//add Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//root
app.get('/', (req, res) => {
  res.send('/index.html');
});

//set up API routes
app.use('/api/todos', routes);

const listener = app.listen(port, () => {
  console.log(`App running on ${port}`);
})