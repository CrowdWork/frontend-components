import React from 'react'

export default class AddTopic extends React.Component {
    state = {
      error: undefined
    }
    
  handleAddTopic = async (e) => {
    e.preventDefault()
    
    const topicName = e.target.elements.topic.value.trim()
    const error = await this.props.handleAddTopic(topicName)
    console.log(error)
    this.setState(() => ({ error }))
    if (!error) {
      console.log(e)
      // e.target.elements.subject.value = ''
    }
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddTopic}>
          <input type="text" name="topic" placeholder="Enter new topic"/>
          <button className="btn black" type="submit">Add Topic</button>
        </form>
      </div>
    )
  }
}