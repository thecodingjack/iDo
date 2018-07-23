import React from 'react';
import Login from './Login.jsx';

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {user: undefined}
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