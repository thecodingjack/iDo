import React from 'react' 
export default class TodoDetails extends React.Component{
  constructor(props){
    super(props)
    this.state = {}
  }

  render(){
    return(
      <div>
        {this.props.title}
      </div>
    )
  }
}
