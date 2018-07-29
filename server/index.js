let express = require('express')
let session = require('express-session')
let morgan = require('morgan');
let parser = require('body-parser');
let cors = require('cors');
let path = require('path');
require('./model/model')
let passport = require('passport')
require('./services/passport.js');
let todo = require('./model/todo')
let user = require('./model/user')

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
  app.use(express.static(path.join(__dirname, '../client/build')));
  app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname, '../client/build/index.html'))
  })
}

app.post('/api/update_username',(req, res)=>{
  user.updateUsername(req.body.userId, req.body.username, (err,result)=>{
    res.send(result)
  })
})

app.post('/api/todos',(req,res)=>{
  let {username,title} = req.body
  todo.createTodoList(username,title,(err,result)=>{
    res.send(result)
  })
})

app.get('/api/todos',(req,res)=>{
  let {username} = req.query
  todo.getUserTodos(username,(err,results)=>{
    res.send(results)
  })
})

app.get('/api/todo',(req,res)=>{
  todo.getTodoById(req.query.id,(err,result)=>{
    res.send(result)
  })
})

app.post('/api/todo',(req,res)=>{
  let{id,todoItems} = req.body
  todo.updateTodoById(id,todoItems,(err,result)=>{
    res.send(result)
  })
})

app.post('/api/todo/comment',(req,res)=>{
  let{id,comments} = req.body
  todo.postComment(id,comments,(err,result)=>{
    res.send(result)
  })
})

app.post('/api/todo/like',(req,res)=>{
  let {todoId,userId} = req.body
  todo.likePost(todoId,userId,(err,result)=>{
    res.send(result)
  })
})

app.post('/api/todo/unlike',(req,res)=>{
  let {todoId,userId} = req.body
  todo.unlikePost(todoId,userId,(err,result)=>{
    res.send(result)
  })
})

app.get('/api/friends',(req,res)=>{
  console.log(req.query.userId)
  user.getAllUser(req.query.userId,(err,results)=>{
    console.log({results})
    res.send(results)
  })
})

app.post('/api/addfriend',(req,res)=>{
  let {senderId, receiverId} = req.body
  user.sendFriendRequest(senderId,receiverId,(err,results)=>{
    res.send(results)
  })
})

app.get('/api/friend_requests',(req,res)=>{
  user.getFriendRequests(req.query.userId,(err,results)=>{
    console.log({results})
    res.send(results)
  })
})

app.post('/api/accept_friend',(req,res)=>{
  let {senderId, receiverId, accepted} = req.body
  user.handleFriendRequest(senderId,receiverId,accepted,(err,results)=>{
    res.send(results)
  })
})

// app.get('/*',(req,res)=>{
//   res.redirect('/')
// })

app.listen(port,()=> console.log('Listening on : ' + port))

module.exports.app = app;