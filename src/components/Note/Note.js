import './Note.css'
import React, { Component } from 'react'
import axios from 'axios'

const authHeader = {
  headers: {
    'Authorization': localStorage.token
  }
}

class Note extends Component {
  state = {
    _id: '',
    title: '',
    body: ''
  }

  componentDidMount() {
    this.fetchNote()
  }

  fetchNote = async () => {
    console.log('fetchNote()')
    try {
      const getNote = await axios.get(`${this.props.url}/notes/${this.props.match.params._id}`, authHeader)
      const fetchedNote = getNote.data
      console.log(fetchedNote)
      this.setState({
        _id: fetchedNote._id,
        title: fetchedNote.title,
        body: fetchedNote.body
      })
    } catch (err) {
      console.log(err)
    }
  }

  onUpdateNote = async (e) => {
    e.preventDefault()
    try {
      const updatedNote = await axios.patch(`${this.props.url}/notes`, {
        _id: this.state._id,
        title: this.state.title,
        body: this.state.body
      }, authHeader)
      this.setState(() => ({
        _id: updatedNote._id,
        title: updatedNote.title,
        body: updatedNote.body
      }))
      this.props.history.push('/legal-index')
    } catch (err) {
      console.log(err)
    }
  }

  onDeleteNote = () => {
    const confirmDelete = prompt(
      `Note: this action cannot be undone. \nPlease type "DELETE" below to proceed.`)
    if (confirmDelete === 'DELETE') {
      try {
        this.props.deleteNote(this.state._id)
        this.props.history.goBack()
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {

    return (
      <div>
        <form onSubmit={this.onUpdateNote}>
          <div className="input-field">
            <input id="title" placeholder="Title..." value={this.state.title} type="text" onChange={(e) => this.setState({ title: e.target.value })} />
          </div>
          <div className="input-field">
            <textarea id="body" className="materialize-textarea body" value={this.state.body} onChange={(e) => this.setState({ body: e.target.value })}></textarea>
          </div>
          <div>
            <button className="btn red offset-s1" onClick={() => this.onDeleteNote(this.state._id)}>Delete</button>
            <p className='offset-s1'> </p>
            <button type="submit" className="btn offset-s1 black" name="action">Save</button>
          </div>
        </form>
      </div>
    )
  }
}
export default Note