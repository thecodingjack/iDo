import React from 'react' 
import axios from 'axios'
import IconLike from './svgs/IconLike.jsx';
import IconLiked from './svgs/IconLiked.jsx';
import IconComment from './svgs/IconComment.jsx';
import IconShare from './svgs/IconShare.jsx';
export default class TodoDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {todoItems : [], comments: [], addToggled: false, showComments: false, liked: false}
    this.todoId = props.id
    this.userId = props.currentUser._id
  }

  handleLike(){
    let count = this.state.likesCount
    if(this.state.liked){
      axios.post('http://localhost:3000/api/todo/unlike',{todoId: this.todoId, userId: this.userId})
      count--
    }else{
      axios.post('http://localhost:3000/api/todo/like',{todoId: this.todoId, userId: this.userId})
      count++
    }
    this.setState({liked: !this.state.liked, likesCount: count})
  }

  toggleAdd(){
    this.setState({addToggled: !this.state.addToggled})
  }

  toggleComment(){
    this.setState({showComments: !this.state.showComments})
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(){
    let tempTodos = [...this.state.todoItems]
    tempTodos.push(this.state.input)
    this.setState({todoItems: tempTodos})
    this.updateTodoItems(this.state.id,tempTodos)
    this.toggleAdd()
  }

  handleCommentInput(input){
    this.setState({comment:input})
  }

  handleCommentSubmit(e){
    e.preventDefault();
    let tempComments = [...this.state.comments]
    let newComment = {commentedBy: this.props.currentUser.username, message: this.state.comment}
    tempComments.push(newComment)
    this.setState({comments: tempComments, comment:''})
    axios.post('http://localhost:3000/api/todo/comment',{id: this.state.id, comments: tempComments})
    .then(res=>console.log(res.data))
  }

  deleteTodoItem(todoIdx){
    if(this.props.isOwner){
      let tempTodos = this.state.todoItems.filter((todoItem,idx)=>idx!=todoIdx)
      this.setState({todoItems: tempTodos})
      this.updateTodoItems(this.state.id,tempTodos)
    }
  }

  getTodoDetails(id){
    axios.get('http://localhost:3000/api/todo',{params:{id}})
      .then(res=>{
        let isLiked = res.data.likes.includes(this.userId)
        this.setState({id:res.data._id, title: res.data.title, todoItems: res.data.todoItems, comments:res.data.comments, likesCount: res.data.likes.length, liked: isLiked})
      })
  }

  updateTodoItems(id,todoItems){
    axios.post('http://localhost:3000/api/todo',{id,todoItems})
      .then(res=>console.log(res.data))
  }

  componentDidMount(){
    this.getTodoDetails(this.props.id)
  }

  render(){
    return(
      <div>
        <h2>{this.state.title}</h2>
        {this.state.todoItems.map((todoItem,idx)=>(
          <li key={idx} onClick={()=>this.deleteTodoItem(idx)}>{todoItem}</li>
        ))}
        {this.props.isOwner && 
          <div className="addTask">
            {this.state.addToggled
            ? <form>
                <input autoFocus onChange={(e)=>this.handleInput(e.target.value)} placeholder="e.g. Study React"></input>
                <button className="red-btn" onClick={()=>this.handleSubmit()}>Add Task</button>
                <a href="#" onClick={()=>this.toggleAdd()} style={{marginLeft: "12px"}}>Cancel</a>
              </form>
            : <a onClick={()=>this.toggleAdd()}href='#' className="action">
                <span className="icon icon-add">Add Task</span>
              </a>
          }
          </div>}
        <hr></hr>
        <div style={{display: "flex",
                    flexWrap: "wrap",
                    alignItems: "center",
                    fontFamily: "sans-serif",
                    justifyContent: "space-between",
                    maxWidth: "150px"}}>
        <a className="icon" href="#" onClick={()=>this.handleLike()}>
        {this.state.liked
        ?<IconLiked/>
        : <IconLike/>
        }
        <span> {this.state.likesCount}</span>
        </a>
        
        <a className="icon" style={{paddingTop:"4px"}} href="#" onClick={()=>this.toggleComment()}>
          <IconComment/>
        </a>
        <a className="icon" href="#" onClick={()=>{alert("sharing will be implemented in the future")}}>
          <IconShare/>
        </a>
        </div>
        {!this.state.showComments
        ? <a onClick={()=> this.toggleComment()} href="#">Show Comments</a>
        : <div>
            <a onClick={()=> this.toggleComment()} href="#">Hide Comments</a>
            {this.state.comments.map(comment=>(
              <div>{comment.commentedBy} : {comment.message}</div>
            ))}
            <form onSubmit={(e)=>this.handleCommentSubmit(e)}>
              <input autoFocus style={{width: "100%"}} onChange={(e)=>this.handleCommentInput(e.target.value)} value={this.state.comment} placeholder="Type your comment here"></input>
              <button type='submit'>Submit</button>
            </form>
          </div>
        }
      </div>
    )
  }
}
