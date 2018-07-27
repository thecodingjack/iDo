import React from 'react' 
import axios from 'axios'
export default class TodoDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {todoItems : [], comments: []}
  }

  handleInput(input){
    this.setState({input})
  }

  handleSubmit(){
    let tempTodos = [...this.state.todoItems]
    tempTodos.push(this.state.input)
    this.setState({todoItems: tempTodos})
    this.updateTodoItems(this.state.id,tempTodos)
  }

  handleCommentInput(input){
    this.setState({comment:input})
  }

  handleCommentSubmit(e){
    e.preventDefault();
    let tempComments = [...this.state.comments]
    let newComment = {commentedBy: this.props.currentUser.username, message: this.state.comment}
    tempComments.push(newComment)
    this.setState({comments: tempComments})
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
      .then(res=>this.setState({id:res.data._id,todoItems: res.data.todoItems, comments:res.data.comments}))
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
        {this.props.title}
        {this.props.isOwner && 
        <div>
          <input onChange={(e)=>this.handleInput(e.target.value)}></input>
          <button onClick={()=>this.handleSubmit()}>Add Task</button>
        </div>}
        {this.state.todoItems.map((todoItem,idx)=>(
          <div key={idx} onClick={()=>this.deleteTodoItem(idx)}>{todoItem}</div>
        ))}
        <h3>Comment</h3>
          {this.state.comments.map(comment=>(
            <div>{comment.commentedBy} : {comment.message}</div>
          ))}
          <form onSubmit={(e)=>this.handleCommentSubmit(e)}>
            <input onChange={(e)=>this.handleCommentInput(e.target.value)} placeholder="Enter Comment"></input>
            <button type='submit'>Submit</button>
          </form>
      </div>
    )
  }
}
