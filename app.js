require('dotenv').config();

const path = require('path');
const express = require('express');
const mongoose = require('mongoose');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const imageRouter = require('./routes/images');
const errorRouter = require('./routes/error');

const app = express();
const silent = process.env.NODE_ENV === 'debug'
const port = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODBURL, {
  useNewUrlParser: true, useUnifiedTopology: true
}).then(() => console.log('DB connected'))
.catch((err) => console.log(`Connection failed. ${err.message}`));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/error', errorRouter);
app.use('/image', imageRouter);

if (!module.parent) {
  app.listen(port);
  console.log('Express started on port ' + port);
}
module.exports = app;