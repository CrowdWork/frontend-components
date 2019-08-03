import './Note.css'
import React, { Component } from 'react'
import axios from 'axios'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

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
      const getNote = await axios.get(`${url}/notes/${this.props.match.params._id}`, authHeader)
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
      const updatedNote = await axios.patch(`${url}/notes`, {
        _id: this.state._id,
        title: this.state.title,
        body: this.state.body
      }, authHeader)
      this.setState({
        _id: updatedNote._id,
        title: updatedNote.title,
        body: updatedNote.body
      })
      this.props.history.goBack()
    } catch (err) {
      console.log(err)
    }
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      <div id="note-form row">
        <form onSubmit={this.onUpdateNote} className="col s12">
          <div className="row">
            <div className="input-field col s12">
              <input id="title" placeholder="Title..." value={this.state.title || ''} type="text" onChange={(e) => this.setState({ title: e.target.value })}/>
            </div>
            <div className="input-field col s12">
              <textarea id="body" className="materialize-textarea" value={this.state.body} onChange={(e) => this.setState({ body: e.target.value })}></textarea>
            </div>
            <button type="submit" href="javascript:void(0)" className="btn right" name="action">Save Changes</button>
          </div>
        </form>
      </div>
    )
  }
}
export default Note