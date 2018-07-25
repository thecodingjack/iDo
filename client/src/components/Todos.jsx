import React from 'react'
import Header from './Header.jsx'
import axios from 'axios'

export default class Todos extends React.Component{
  constructor(props){
    super(props)
    this.state = {todos: []}

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getTodo(userId){
    axios.get('/api/todo',{params: {userId}})
      .then(res=>this.setState({todos: res.data}))
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(){
    this.createTodo(this.props.user._id,this.state.input)
  }

  createTodo(userId,todoItem){
    axios.post('/api/todo',{userId,todoItem})
      .then(res=>this.getTodo(userId))
  }

  componentDidMount(){

    this.getTodo(this.props.user._id)
  }

  render(){
    return(
      <div>
        <Header/>
        <div>Welcome {this.props.user.name}</div>
        <h2>Todos</h2>
        <input onChange={(e)=>this.handleInput(e.target.value)}></input>
        <button onClick={()=>this.handleSubmit()}>Create</button>
        {this.state.todos.map(todo=>(
          <li>{todo.todoItem}</li>
        ))}
      </div>
    )
  }
}
