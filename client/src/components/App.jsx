import React from 'react';
import axios from 'axios'
import Login from './Login.jsx';

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: undefined,
      todos: []
    }
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(){
    this.createTodo(this.state.user._id,this.state.input)
  }

  createTodo(userId,todoItem){
    axios.post('/api/todo',{userId,todoItem})
      .then(res=>this.getTodo(userId))
  }
  
  getTodo(userId){
    axios.get('/api/todo',{params: {userId}})
      .then(res=>this.setState({todos: res.data}))
  }

  getUser(){
    axios.get('/auth/current_user')
      .then(res=> {
        this.setState({user: res.data})
        this.getTodo(this.state.user._id)
      })
  }

  logOut(){
    axios.get('/auth/logout')
      .then(()=>this.setState({user: undefined}))
  }

  componentDidMount(){
    this.getUser()
  }
  
  render(){
    return(
      <div className="app">
        {this.state.user
        ? <div>
            <div>Welcome {this.state.user.name}</div>
            <input onChange={(e)=>this.handleInput(e.target.value)}></input>
            <div>
              {this.state.todos.map(todo=>(
                <div>{todo.todoItem}</div>
              ))}
            </div>
            <button onClick={()=>this.handleSubmit()}>Create</button>
            <button onClick={()=>this.logOut()}>Log Out</button>
          </div>
        : <Login onLogin={this.handleLogin} onSignUp={this.handleSignUp}/>} 
      </div>
    )
  }
}