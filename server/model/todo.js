const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'user'},
  username: String,
  todoItem: String,
  amount: Number,

})

let Todo = mongoose.model('todo', todoSchema)

let getUserTodos = (username,cb)=>{
  Todo.find({username})
  .exec((err,todos)=>{
    if(err) cb(err)
    else cb(null,todos);
  })
}

let createTodoItem = (username,todoItem,cb)=>{
  new Todo({username,todoItem}).save()
    .then(newTodo=>cb(null,newTodo))
    .catch(err=>cb(err))
}

module.exports = {
  getUserTodos,
  createTodoItem
}