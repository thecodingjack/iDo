const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'user'},
  username: String,
  title: String,
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

let createTodoList = (username,title,cb)=>{
  new Todo({username,title}).save()
    .then(newTodo=>cb(null,newTodo))
    .catch(err=>cb(err))
}

module.exports = {
  getUserTodos,
  createTodoList
}