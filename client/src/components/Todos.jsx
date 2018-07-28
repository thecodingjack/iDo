import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Modal, Button } from 'react-bootstrap'
import { Redirect, Switch } from 'react-router'
import TodoDetails from './TodoDetails.jsx';
import IconAdd from './svgs/IconAdd.jsx';



export default class Todos extends React.Component{
  constructor(props){
    super(props)

    console.log(props.username)
    this.state = {todos: [], isOwner: props.username === props.currentUser.username, show: false}
    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleShow = this.toggleShow.bind(this)
  }

  toggleShow(){
    this.setState({show: !this.state.show})
  }

  getTodo(username){
    axios.get('/api/todos',{params: {username}})
      .then(res=>this.setState({todos: res.data}))
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(e){
    if(e) e.preventDefault();
    this.createTodoList(this.props.username,this.state.input)
    this.toggleShow()
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
                <div style={{display: "flex", flexWrap: "wrap"}}>
                  <h2>Todos</h2>

                  {this.state.isOwner &&
                  <div onClick={this.toggleShow} style={{margin: "27px 20px 20px 20px", cursor : "pointer"}}>
                    <IconAdd>Create</IconAdd>
                  </div>}
                </div>

                <Modal show={this.state.show} onHide={this.toggleShow}>
                  <Modal.Header closeButton>
                    <Modal.Title>New list</Modal.Title>
                  </Modal.Header>
                  <Modal.Body>
                    <form onSubmit={(e)=>this.handleSubmit(e)}> 
                      <input autoFocus onChange={(e)=>this.handleInput(e.target.value)} placeholder="e.g. Conference 4/20 List"></input>
                    </form>
                  </Modal.Body>
                  <Modal.Footer>
                    <button className="red-btn" onClick={()=>this.handleSubmit()}>Create</button>
                  </Modal.Footer>
                </Modal>
                
                {this.state.todos.map(todoList=>(
                  <div className="card col-md-3 card-border" style={{margin : '10px', padding: '5px'}}>
                    <div className="card-body">
                      <Link className="h4" to={{ pathname: `/${this.props.username}/${todoList._id}`, state: {id:todoList._id} }}>{todoList.title}</Link>
                      <h6 className="card-text">Your list's snippets</h6>
                    </div>
                  </div>  
                ))}
              </div>
            )}/>
            <Route path={`/${this.props.username}/:id`} render={(props)=>(
              <TodoDetails id={props.match.params.id} isOwner={this.state.isOwner} currentUser={this.props.currentUser}/>
            )}/>
          </Switch>
        </div>
      </Router>
    )
  }
}
