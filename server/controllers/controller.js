let todo = require('../model/todo')
let user = require('../model/user')

module.exports = {
  user:{
    updateUsername : (req, res)=>{
      user.updateUsername(req.body.userId, req.body.username, (err,result)=>{
        res.send(result)
      })
    },
    getAllUser : (req,res)=>{
      user.getAllUser(req.query.userId,(err,results)=>{
        res.send(results)
      })
    },
    sendFriendRequest : (req,res)=>{
      let {senderId, receiverId} = req.body
      user.sendFriendRequest(senderId,receiverId,(err,results)=>{
        res.send(results)
      })
    },
    getFriendRequests : (req,res)=>{
      user.getFriendRequests(req.query.userId,(err,results)=>{
        res.send(results)
      })
    },
    handleFriendRequest : (req,res)=>{
      let {senderId, receiverId, accepted} = req.body
      user.handleFriendRequest(senderId,receiverId,accepted,(err,results)=>{
        res.send(results)
      })
    }
  },
  todo:{
    getUserTodos : (req,res)=>{
      let {username} = req.query
      todo.getUserTodos(username,(err,results)=>{
        res.send(results)
      })
    },
    createTodoList : (req,res)=>{
      let {username,title} = req.body
      todo.createTodoList(username,title,(err,result)=>{
        res.send(result)
      })
    },
    getTodoById : (req,res)=>{
      todo.getTodoById(req.query.id,(err,result)=>{
        res.send(result)
      })
    },
    updateTodoById : (req,res)=>{
      let{id,todoItems} = req.body
      todo.updateTodoById(id,todoItems,(err,result)=>{
        res.send(result)
      })
    },
    postComment : (req,res)=>{
      let{id,comments} = req.body
      todo.postComment(id,comments,(err,result)=>{
        res.send(result)
      })
    },
    likePost : (req,res)=>{
      let {todoId,userId} = req.body
      todo.likePost(todoId,userId,(err,result)=>{
        res.send(result)
      })
    },
    unlikePost : (req,res)=>{
      let {todoId,userId} = req.body
      todo.unlikePost(todoId,userId,(err,result)=>{
        res.send(result)
      })
    }
  }
}