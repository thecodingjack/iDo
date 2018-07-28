const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'user'},
  username: String,
  title: String,
  todoItems: Array,
  comments: Array,
  amount: Number,
  likes: [{type: Schema.Types.ObjectId, ref: 'user'}],
})

let Todo = mongoose.model('todo', todoSchema)

let getUserTodos = (username,cb)=>{
  Todo.find({username})
  .exec((err,todos)=>{
    if(err) cb(err)
    else cb(null,todos);
  })
}

let createTodoList = (username,title,cb)=>{
  new Todo({username,title}).save()
    .then(newTodo=>cb(null,newTodo))
    .catch(err=>cb(err))
}

let getTodoById = (id,cb)=>{
  Todo.findById(id)
    .then(todo=>cb(null,todo))
    .catch(err=>cb(err))
}

let updateTodoById = (id,todoItems,cb)=>{
  Todo.findByIdAndUpdate(id,{
    $set: {todoItems}
  },{new: true})
    .then(todo=>{
      cb(null,todo)
    })
}

let postComment = (id,comments,cb)=>{
  Todo.findByIdAndUpdate(id,{
    $set: {comments}
  },{new: true})
    .then(todo=>{
      cb(null,todo)
    })
}

let likePost = (todoId,userId,cb)=>{
  Todo.update(
    {_id: todoId},
    {$addToSet: {likes: userId}}
  ).then(result=>cb(null,result))
}

let unlikePost = (todoId,userId,cb)=>{
  Todo.update(
    {_id: todoId},
    {$pull: {likes: userId}}
  ).then(result=>cb(null,result))
}

module.exports = {
  getUserTodos,
  createTodoList,
  getTodoById,
  updateTodoById,
  postComment,
  likePost,
  unlikePost,
}