import React from 'react';
import Login from './Login.jsx';
import axios from 'axios'

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {user: undefined}
  }

  getUser(){
    axios.get('/api/current_user')
      .then(res=> this.setState({user: res.data}))
  }

  componentDidMount(){
    this.getUser()
  }
  
  render(){
    return(
      <div className="app">
        {this.state.user
        ? <div>Welcome</div>
        : <Login onLogin={this.handleLogin} onSignUp={this.handleSignUp}/>} 
      </div>
    )
  }
}