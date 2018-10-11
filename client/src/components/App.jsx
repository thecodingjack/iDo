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
import Dashboard from './Dashboard.jsx';
import Ads from './Ads.jsx';

export default class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      user: undefined,
    }

    this.updateUsername = this.updateUsername.bind(this)
    this.getUser = this.getUser.bind(this)
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
    console.log(process.env.CLIENT_URL)
    return(
      !this.state.user
      ? <Login getUser={this.getUser}/>
      : this.state.user.username === undefined || null
        ? <Username user={this.state.user} updateUsername={this.updateUsername}/>
        : <Router>
            <div>
              <Header user={this.state.user}/>
              <div className="col-md-12">
                <div className="col-md-3 left-bar">
                  <div style={{padding: '16px', marginLeft: '40px'}}>
                    <a href='#'>Today</a>
                  </div>
                  <div style={{padding: '16px', marginLeft: '40px'}}>
                    <a href='#'>Next 7 days</a>
                  </div>
                  <div style={{padding: '16px', marginLeft: '40px'}}>
                    <a href='#'>Pinned</a>
                  </div>
                  <div style={{padding: '16px', marginLeft: '40px'}}>
                    <a href='#'>Filter</a>
                  </div>
                </div>
                <div className="col-md-9">
                  <Switch>
                    <Route path="/" exact render={()=>( 
                      <Dashboard user={this.state.user}/>
                    )}/>
                    <Route path="/friends" render={()=>(
                      <Friends user={this.state.user}/>
                    )}/>
                    <Route path="/:username" render={(props)=>(
                      <Todos username={props.match.params.username} currentUser={this.state.user}/>
                    )}/>
                  </Switch>
                </div>
              </div>
              <Ads/>
            </div>
          </Router>
    )
  }
}