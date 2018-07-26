import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Redirect, Switch } from 'react-router'
import TodoDetails from './TodoDetails.jsx';


export default class Todos extends React.Component{
  constructor(props){
    super(props)
    // this.username = props.history.location.pathname.substring(1)
    console.log(props.username)
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
    this.createTodoList(this.username,this.state.input)
  }

  createTodoList(username,title){
    axios.post('/api/todos',{username,title})
      .then(res=>this.getTodo(username))
  }

  componentDidMount(){
    this.getTodo(this.props.username)
  }

  render(){
    return(
      <Router>
        <div>
          <Switch>
            <Route path={`/${this.props.username}`} exact render={()=>(
              <div>
                <h2>Todos</h2>
                <input onChange={(e)=>this.handleInput(e.target.value)}></input>
                <button onClick={()=>this.handleSubmit()}>Create</button>
                {this.state.todos.map(todoList=>(
                  <li>
                    <Link to={`/${this.props.username}/${todoList.title}`}>{todoList.title}</Link>
                  </li>
                ))}
              </div>
            )}/>
            <Route path={`/${this.props.username}/:title`} render={(props)=>(
              <TodoDetails title={props.match.params.title}/>
            )}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
