const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  createdBy: {type: Schema.Types.ObjectId, ref: 'user'},
  todoItem: String,
  amount: Number,

})

let Todo = mongoose.model('todo', todoSchema)

let getUserTodos = (userId,cb)=>{
  Todo.find({createdBy: userId})
  .populate('createdBy')
  .exec((err,todos)=>{
    console.log(err);
    if(err) cb(err)
    else cb(null,todos);
  })
}

let createTodoItem = (createdBy,todoItem,cb)=>{
  new Todo({createdBy,todoItem}).save()
    .then(newTodo=>cb(null,newTodo))
    .catch(err=>cb(err))
}

module.exports = {
  getUserTodos,
  createTodoItem
}