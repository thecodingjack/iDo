let express = require('express')
let session = require('express-session')
let morgan = require('morgan');
let parser = require('body-parser');
let cors = require('cors');
let path = require('path')

let passport = require('passport')
require('./services/passport.js');

let controller = require('./controllers/controller')
var authRouter = require('./routes/authRoutes.js')

let app = express()
let port = process.env.PORT || 3000;
app.set('port',port);

/****** express middleware ******/
app.use(parser.json());
app.use(parser.urlencoded({ extended: true }));
app.use(cors());
app.use(morgan('dev'));
app.use(session({ secret: 'todo-secret', cookie: { maxAge: 1000 * 60 * 60 * 24 * 30 }}))
app.use(passport.initialize());
app.use(passport.session())
/******* end of middleware ******/

app.use('/auth',authRouter)

if(process.env.NODE_ENV === 'production'){
  app.use(express.static(__dirname + '/../client/dist'));
}

app.post('/api/update_username', controller.user.updateUsername)
app.get('/api/friends', controller.user.getAllUser)
app.post('/api/addfriend', controller.user.sendFriendRequest)
app.get('/api/friend_requests', controller.user.getFriendRequests)
app.post('/api/accept_friend', controller.user.handleFriendRequest)

app.get('/api/todos', controller.todo.getUserTodos)
app.post('/api/todos', controller.todo.createTodoList)
app.get('/api/todo', controller.todo.getTodoById)
app.post('/api/todo', controller.todo.updateTodoById)
app.post('/api/todo/comment', controller.todo.postComment)
app.post('/api/todo/like', controller.todo.likePost)
app.post('/api/todo/unlike', controller.todo.unlikePost)

app.get('*',(req,res)=>{
  res.sendFile(path.join(__dirname ,'/../client/dist/index.html'));
})

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;