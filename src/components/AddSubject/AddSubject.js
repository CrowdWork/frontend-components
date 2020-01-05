import React from 'react'
import '../Admin/Admin.css'

export default class AddSubject extends React.Component {
    state = {
      error: undefined
    }
    
  handleAddSubject = async (e) => {
    e.preventDefault()
    
    const subjectName = e.target.elements.subject.value.trim()
    const error = await this.props.handleAddSubject(subjectName)
    console.log(error)
    this.setState(() => ({ error }))
    if (!error) {
      console.log(e)
      // e.target.elements.subject.value = ''
    }
  }

  render() {
    return (
      <div className="AddSubject-container">
        {this.state.error && <p>{this.state.error}</p>}
        <form onSubmit={this.handleAddSubject}>
          <input type="text" name="subject" placeholder="Enter new subject"/>
          <button className="btn black" type="submit">Add Subject</button>
        </form>
      </div>
    )
  }
}