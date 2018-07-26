import React from 'react'
import axios from 'axios'

export default class Todos extends React.Component{
  constructor(props){
    super(props)
    this.username = props.history.location.pathname.substring(1)
    console.log(this.username)
    this.state = {todos: []}
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  getTodo(username){
    axios.get('/api/todos',{params: {username}})
      .then(res=>this.setState({todos: res.data}))
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(){
    this.createTodo(this.username,this.state.input)
  }

  createTodo(username,todoItem){
    axios.post('/api/todos',{username,todoItem})
      .then(res=>this.getTodo(username))
  }

  componentDidMount(){
    this.getTodo(this.props.history.location.pathname.substring(1))
  }

  render(){
    return(
      <div>
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
