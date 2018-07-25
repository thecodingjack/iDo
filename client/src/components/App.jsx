import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import axios from 'axios'
import Header from './Header.jsx'
import Login from './Login.jsx'
import Todos from './Todos.jsx'

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: undefined,
      todos: []
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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
      .then(({data})=> {
        if(data){
          this.setState({user: data})
          this.getTodo(this.state.user._id)
        }else{

        }
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
      <Router>
        <div>
          <Header/>
          <Route path="/" exact render={()=>( 
              <Todos/>
          )}/>
          <Route path="/login" render={()=>(
            <Login/>
          )}/>
        </div>
      </Router>
      // <div className="app">
      //   {this.state.user
      //   ? <div>
      //       <div>Welcome {this.state.user.name}</div>
      //       <input onChange={(e)=>this.handleInput(e.target.value)}></input>
      //       <div>
      //         {this.state.todos.map(todo=>(
      //           <div>{todo.todoItem}</div>
      //         ))}
      //       </div>
      //       <button onClick={()=>this.handleSubmit()}>Create</button>
      //       <button onClick={()=>this.logOut()}>Log Out</button>
      //     </div>
      //   : <Login onLogin={this.handleLogin} onSignUp={this.handleSignUp}/>} 
      // </div>
    )
  }
}