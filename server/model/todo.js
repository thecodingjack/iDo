const mongoose= require('mongoose');
const Schema = mongoose.Schema;

let todoSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, ref: 'user'},
  username: String,
  title: String,
  todoItems: Array,
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

let getTodoById = (id,cb)=>{
  Todo.findById(id)
    .then(todo=>cb(null,todo))
    .catch(err=>cb(err))
}

let updateTodoById = (id,todoItems,cb)=>{
  console.log(id)
  console.log(cb)
  Todo.findByIdAndUpdate(id,{
    $set: {todoItems}
  },{new: true})
    .then(todo=>{
      console.log(todo)
      cb(null,todo)
    })
}

module.exports = {
  getUserTodos,
  createTodoList,
  getTodoById,
  updateTodoById,
}