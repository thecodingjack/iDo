const mongoose = require('mongoose');
require('./user')
require('./todo')

let dbURL = process.env.MONGODB_URI||'mongodb://localhost/todo'

mongoose.connect(dbURL);
let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("db connected")
});