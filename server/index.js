let express = require('express')
let session = require('express-session')
let morgan = require('morgan');
let parser = require('body-parser');
let cors = require('cors');
require('./model/model')
let passport = require('passport')
require('./services/passport.js');
let todo = require('./model/todo')

var authRouter = require('./routes/authRoutes.js')

let app = express()
let port = process.env.PORT || 3000;
app.set('port',port);

/****** express middleware ******/
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({ secret: 'todo-secret', cookie: { maxAge: 600000 }}))
app.use(passport.initialize());
app.use(passport.session())
/******* end of middleware ******/

app.use('/auth',authRouter)
app.use(express.static(__dirname + '/../client/dist'));

app.post('/api/todo',(req,res)=>{
  let {userId,todoItem} = req.body
  todo.createTodoItem(userId,todoItem,(err,result)=>{
    res.send(result)
  })
})

app.get('/api/todo',(req,res)=>{
  let {userId} = req.query
  console.log(req.query)
  todo.getUserTodos(userId,(err,results)=>{
    console.log(results);
    res.send(results)
  })
})

app.get('/*',(req,res)=>{
  res.redirect('/')
})

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;