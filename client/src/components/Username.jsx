import React from 'react' 
import axios from 'axios'
export default class Username extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  handleInput(username){
    this.setState({username})
  }


  render(){
    return(
      <div>
        <h3>Welcome {this.props.user.name}, please create your username</h3>
        <input onChange={(e)=>this.handleInput(e.target.value)}></input>
        <button onClick={()=>this.props.updateUsername(this.props.user._id, this.state.username)}>Create account!</button>
      </div>
    )
  }
}