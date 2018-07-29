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
    this.state = {suggestions: [], friendRequests: [], friends: []}
  }

  addFriend(senderId,receiverId){
    axios.post('/api/addfriend',{senderId,receiverId})
      .then(res=>console.log(res.data))
  }

  showSuggestions(userId){
    axios.get('/api/friends',{params:{userId}})
      .then(res=> this.setState({suggestions:res.data}))
  }

  getFriendRequests(userId){
    axios.get('/api/friend_requests',{params:{userId}})
      .then(res=> this.setState({friendRequests: res.data.receivedFriendRequests, friends: res.data.friends}))
  }

  handleFriendRequests(senderId,receiverId,accepted){
    axios.post('/api/accept_friend',{senderId,receiverId,accepted})
      .then(res=> this.getFriendRequests(receiverId))
  }

  componentDidMount(){
    this.getFriendRequests(this.props.user._id)
    this.showSuggestions(this.props.user._id)
  }

  render(){
    return(
      <div>
        {!!this.state.friendRequests.length && <h4>Friend Requests</h4>}
        {this.state.friendRequests.map(friend=>(
          <div className="card card-border">
          <div className="card-body" style={{display: "flex"}}>
            <img className="card-img-left" src={friend.avatarUrl}></img>
            <div style={{display: "flex", justifyContent:"space-between", flexGrow: 1}}>
              <div className="card-left" style={{padding: "16px"}}>
                <Link to={`/${friend.username}`}>{friend.username} </Link>
                <h6 className="card-text">Hi, Please add me</h6>
              </div>
              <div className="card-right" style={{alignSelf: "center"}}>
                <button className="red-btn" style={{height: "40px", marginRight:"24px"}} onClick={()=>this.handleFriendRequests(friend._id,this.props.user._id,1)}>Add Friend</button>
              </div>
            </div>
          </div>
        </div>
        ))}
        <h4>You may know</h4>
        {this.state.suggestions.map(friend=>(
          <div className="card card-border">
          <div className="card-body" style={{display: "flex"}}>
            <img className="card-img-left" src={friend.avatarUrl}></img>
            <div style={{display: "flex", justifyContent:"space-between", flexGrow: 1}}>
              <div className="card-left" style={{padding: "16px"}}>
                <Link to={`/${friend.username}`}>{friend.username} </Link>
                <h6>Insert cliche description</h6>
              </div>
              <div className="card-right" style={{alignSelf: "center"}}>
                <button className="red-btn" style={{height: "40px", marginRight:"24px"}} onClick={()=>this.addFriend(this.props.user._id,friend._id)}>Add Friend</button>
              </div>
            </div>
          </div>
        </div>  
        ))}
        <h4>Your Friends</h4>
        {this.state.friends.map(friend=>(
          <div className="card card-border">
            <div className="card-body" style={{display: "flex"}}>
              <img className="card-img-left" src={friend.avatarUrl}></img>
              <div style={{display: "flex", justifyContent:"space-between", flexGrow: 1}}>
                <div className="card-left" style={{padding: "16px"}}>
                  <Link to={`/${friend.username}`}>{friend.username} </Link>
                  <h6 className="card-text">Your awesome friend</h6>
                </div>
                <div className="card-right" style={{alignSelf: "center"}}>
                  <button className="red-btn" style={{height: "40px", marginRight:"24px"}} onClick={()=>alert("Chat feature will be added in the future")}>Chat</button>
                </div>
              </div>
            </div>
          </div>  
        ))}
      </div>
    )
  }
}

