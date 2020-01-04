import React from 'react'
import '../Admin/Admin.css'

export default class AddQuiz extends React.Component {
    state = {
      error: undefined,
      topic: ''
    }
    
  handleAddQuiz = async (e) => {
    e.preventDefault()
    
    const question = e.target.elements.question.value.trim()
    const answer = e.target.elements.answer.value.trim()
    const explanation = e.target.elements.explanation.value.trim()
    const data = {
      question,
      answer,
      explanation,
      topic: this.state.topic
    }
    const error = await this.props.handleAddQuiz(data)
    console.log(error)
    this.setState(() => ({ error }))
    if (!error) {
      console.log(e)
      // e.target.elements.question.value = ''
      // e.target.elements.answer.value = ''
      // e.target.elements.explanation.value = ''
    }
  }

  handleRenderTopics() {
    const { topics } = this.props
    return topics.map(topic => <option key={topic._id} value={topic._id}>{topic.name}</option>)
  }

  render() {
    return (
      <div>
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddQuiz}>
          <input type="text" name="question" placeholder="Enter quiz question" />
          <textarea name="answer" placeholder="Enter answer" />
          <textarea name="explanation" placeholder="Enter explanation" />
          <select value={this.state.topic} className="browser-default" onChange={(e) => this.setState({ topic: e.target.value })}>
            <option>Select Topic...</option>
            {this.handleRenderTopics()}
          </select>
          <button className="btn black" type="submit">Add Quiz</button>
        </form>
      </div>
    )
  }
}