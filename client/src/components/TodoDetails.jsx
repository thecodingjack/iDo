import React from 'react' 
import axios from 'axios'
export default class TodoDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {todoItems : []}
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(){
    let tempTodos = [...this.state.todoItems]
    tempTodos.push(this.state.input)
    console.log(tempTodos)
    this.setState({todoItems: tempTodos})
    this.updateTodoItems(this.state.id,tempTodos)
  }

  getTodoDetails(id){
    axios.get('http://localhost:3000/api/todo',{params:{id}})
      .then(res=>this.setState({id:res.data._id,todoItems: res.data.todoItems}))
  }

  updateTodoItems(id,todoItems){
    console.log(todoItems)
    axios.post('http://localhost:3000/api/todo',{id,todoItems})
      .then(res=>console.log(res.data))
  }

  componentDidMount(){
    this.getTodoDetails(this.props.id)
  }

  render(){
    return(
      <div>
        {this.props.title}
        {this.props.isOwner && 
        <div>
          <input onChange={(e)=>this.handleInput(e.target.value)}></input>
          <button onClick={()=>this.handleSubmit()}>Add Task</button>
        </div>}
        {this.state.todoItems.map(todoItem=>(
          <div>{todoItem}</div>
        ))}
      </div>
    )
  }
}
