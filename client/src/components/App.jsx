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

export default class App extends React.Component{
  constructor(props){
    super(props)

    this.state = {
      user: undefined,
    }
  }

  getUser(){
    axios.get('/auth/current_user')
      .then(({data})=> {
        if(data){
          this.setState({user: data})
        }else{

        }
      })
  }

  componentDidMount(){
    this.getUser()
  }
  
  render(){
    return(
      !this.state.user
      ?<Login/>
      :<Router>
        <div>
          <Switch>
            <Route path="/" exact render={()=>( 
                <Todos user={this.state.user}/>
            )}/>
            <Route path="/login" render={()=>(
              <Login/>
            )}/>
            <Route component={NotFound}/>
          </Switch>
        </div>
      </Router>
    )
  }
}