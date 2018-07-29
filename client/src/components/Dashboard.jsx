import React from 'react' 
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
export default class Dashboard extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      feeds:[{
        createdBy: {
          _id: '1',
          username: 'Mark Zuckerberg',
          avatarUrl: ''
        },
        text: 'Mark created a new todolist',
        link: 'http://localhost:8080/lamkeong/5b59f69c5d30b316851e67a0'
      // },{
      //   createdBy: "",
      //   text: "",
      //   date: "",
      //   link: ""
      },
      ]
    }
  }

  render(){
    return(
      <div>
      <h2>Dashboard</h2>
        {this.state.feeds.map(feed=>(
          <div className="card card-border">
          <div className="card-body" style={{display: "flex"}}>
            <img className="card-img-left" style={{width:"50px", height:"50px", marginTop:"auto", marginBottom:"auto", borderRadius:"50%"}}src="https://pbs.twimg.com/profile_images/990405493221969920/muN2pHP2_400x400.jpg"></img>
            <div style={{display: "flex", justifyContent:"space-between", flexGrow: 1}}>
              <div className="card-left" style={{padding: "16px"}}>
                <Link to={`/${feed.createdBy.username}`}>{feed.createdBy.username} </Link>
                <h6 className="card-text">{feed.text}</h6>
                <a className="h6" href={feed.link}>View here</a>
              </div>
            </div>
          </div>
        </div>    
        ))}
      </div>
    )
  }
}
