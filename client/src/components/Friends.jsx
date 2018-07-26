import React from 'react'
import axios from 'axios'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'

export default class Friends extends React.Component{
  constructor(props){
    super(props)
    this.state = {friends: [], friendsTodo: []}
  }

  showFriends(userId){
    axios.get('/api/friends')
      .then(res=> this.setState({friends:res.data}))
  }

  componentDidMount(){
    this.showFriends(this.props.user._id)
  }

  render(){
    return(
      <div>
        <h2>Your Friends</h2>
        {this.state.friends.map(friend=>(
          <Link onClick={()=>this.props.handleSelectUser(friend)} to={`/${friend.username}`}>{friend.username}</Link>
        ))}
      </div>
    )
  }
}

