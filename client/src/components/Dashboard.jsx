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
          username: 'David Kim',
          avatarUrl: 'https://ebus.ca/wp-content/uploads/2017/08/profile-placeholder.jpg'
        },
        text: 'David added a new task to his todolist',
        link: 'https://i-do-1.herokuapp.com/David%20Kim/5b5df0d1ce221c0004c64f1d'
      },{
        createdBy: {
          _id: '2',
          username: 'Mark Zuckerberg',
          avatarUrl: 'https://pbs.twimg.com/profile_images/990405493221969920/muN2pHP2_400x400.jpg'
        },
        text: 'Mark created a new todolist',
        link: 'https://i-do-1.herokuapp.com/Mark%20Zuckerberg/5b5ddb865fae750004366734'
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
            <img className="card-img-left" style={{width:"50px", height:"50px", marginTop:"auto", marginBottom:"auto", borderRadius:"50%"}}src={feed.createdBy.avatarUrl}></img>
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
