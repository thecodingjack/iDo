import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import { Redirect, Switch } from 'react-router'
import axios from 'axios'
import Login from './Login.jsx'
import Todos from './Todos.jsx'
import NotFound from './NotFound.jsx'
import Friends from './Friends.jsx';
import Username from './Username.jsx';
import Header from './Header.jsx';
import Dashboard from './Dashboard.jsx'

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: undefined,
    }

    this.updateUsername = this.updateUsername.bind(this)
  }

  updateUsername(userId,username){
    axios.post('/api/update_username',{userId,username})
      .then(({data})=> {
        this.setState({user: data})
      }
    )}

  getUser(){
    axios.get('/auth/current_user')
      .then(({data})=> this.setState({user: data})
    )}

  componentDidMount(){
    this.getUser()
  }
  
  render(){
    return(
      !this.state.user
      ? <Login/>
      : this.state.user.username === undefined || null
        ? <Username user={this.state.user} updateUsername={this.updateUsername}/>
        : <Router>
            <div>
              <Header user={this.state.user}/>
              <Switch>
                <Route path="/" exact render={()=>( 
                    <Dashboard user={this.state.user}/>
                )}/>
                <Route path="/friends" render={()=>(
                  <Friends user={this.state.user}/>
                )}/>
                <Route path="/:username" render={(props)=>(
                  <Todos username={props.match.params.username}/>
                )}/>
              </Switch>
            </div>
          </Router>
    )
  }
}