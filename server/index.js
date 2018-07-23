const express = require('express')
var morgan = require('morgan');
var parser = require('body-parser');
var cors = require('cors');

let app = express()

let port = process.env.PORT || 3000;

app.set('port',port);
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/../client/dist'));

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;