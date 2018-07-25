import React from 'react';
import Login from './Login.jsx';
import axios from 'axios'

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {user: undefined}
  }

  getUser(){
    axios.get('/auth/current_user')
      .then(res=> this.setState({user: res.data}))
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
            <button onClick={()=>this.logOut()}>Log Out</button>
          </div>
        : <Login onLogin={this.handleLogin} onSignUp={this.handleSignUp}/>} 
      </div>
    )
  }
}