const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const todo = require('./routes/todo.js'), app = express();
require('dotenv').config();
app.set('view engine', 'ejs');
app.use(bodyParser.json()).use(bodyParser.urlencoded({extended:true}));
const url = process.env.DBURL;
mongoose.connect('mongodb://localhost/kanban')
  .then(()=>{console.log("Connected to mongodb!")})
  .catch(err => console.log('error happened', err));
app.use('/', todo);

app.listen(3000, ()=> console.log("listening on http://localhost:3000 "));