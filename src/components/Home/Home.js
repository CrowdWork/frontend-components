import './Home.css'
import M from 'materialize-css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import ListCard from '../ListCard/ListCard'
import Axios from 'axios'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

class Home extends Component {
  state = {
      listTitle: '',
      listPublic: false,
      noteTitle: '',
      noteBody: '',
      selectedOption: 'my-lists'
  }

  componentDidMount() {
    console.log('Home mounted')
    const elems = document.querySelectorAll('.collapsible')
    M.Collapsible.init(elems)
    const tabs = document.querySelectorAll('.tabs')
    M.Tabs.init(tabs)
    const modals = document.querySelectorAll('.modal')
    for (let i = 0; i < modals.length; i++){
      M.Modal.init(modals[i])
    }
  }

  onHandleChange(e) {
    this.setState({ selectedOption: e.target.value })
    this.props.fetchPubLists()
  }
  renderLists() {
    console.log('RENDER LISTS')
    const { lists } = this.props
    if (!lists.length) return <p className="center-align">Use the button on the right to create a new list.</p>

    return lists.map(list => {
      return (
        <div className="col s12 m6 l4 xl3 list-card" key={list._id}>
          <ListCard
            listRoute={`/list/${list._id}`}
            title={list.title}
            isPublic={list.public}
          />
        </div>
      )
    })
  }

  renderNotes() {
    console.log('RENDER NOTES')
    const { notes } = this.props
    if (notes) {
      return notes.map(note => {
        return (
          <div className="col s12 m6 l4 xl3 list-card" key={note._id}>
            <ListCard
              listRoute={`/notes/${note._id}`}
              title={note.title}
              body={note.body}
            />
          </div>
        )
      })
    }
  }

  onListFormSubmit = (e) => {
    e.preventDefault()
    this.props.onAddList(this.state)
    this.setState({
      listTitle: '',
      listPublic: false,
      noteTitle: '',
      noteBody: ''
    })
  }
  onNoteFormSubmit = (e) => {
    e.preventDefault()
    this.props.onAddNote(this.state)
    this.setState({
      listTitle: '',
      listPublic: false,
      noteTitle: '',
      noteBody: ''
    })
  }

  render() {
    console.log(this.props.lists)
    return (
      <div className="account-overview-wrapper">
        {/* <h1 className="h1-style">Dashboard</h1> */}
        <ul id="tabs-swipe-demo" className="tabs tabs-fixed-width">
        <li className="tab col s4"><a href="#tab-account" className="active">Account</a></li>
          <li className="tab col s4"><a href="#tab-lists">Lists</a></li>
          <li className="tab col s4"><a href="#tab-notes">Notes</a></li>
        </ul>
          
          <div id="tab-account" className="col s12">
            <div className="row">
              <div className="col s12 offset-l2">
                <h5>Account</h5>
                <p>Manage your account settings.</p>
              </div>
              <div className="col s12 offset-l2">
              <ul className="no-padding collapsible col s12 l8">
                <li>
                  <div className="collapsible-header"><i className="material-icons">perm_identity</i>Personal Details</div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="col s12 m4 offset-m2">
                        <h6>NAME</h6>
                        <p><b>{this.props.firstName} {this.props.lastName}</b></p>
                      </div>
                      <div className="col s12 m4">
                        <h6>EMAIL</h6>
                        <p><b>{this.props.email}</b></p>
                      </div>
                      <div className="col s12 m4 offset-m2">
                        <h6>PHONE</h6>
                        <p><b>{this.props.phoneNumber}</b></p>
                      </div>
                      <div className="col s12 m4">
                        <h6>PROFESSION</h6>
                        <p><b></b></p>
                      </div>
                    </div>
                    
                  </div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">payment</i>Billing & Subscriptions</div>
                  <div className="collapsible-body"><Link to='/subscribe' className="btn-flat indigo-text">Test Subscription</Link></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">security</i>Password & Security</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
              </ul>
              </div>
              
            </div>
          </div>
          <div id="tab-lists" className="col s12">
            {/*LIST MODAL STRUCTURE */}
            <div id="modal1" className="modal">
              <div className="modal-content">
                <h4>New list...</h4>
                <form onSubmit={this.onListFormSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input value={this.state.listTitle} id="listTitle" type="text" onChange={(e) => this.setState({ listTitle: e.target.value })} />
                      <label htmlFor="listTitle">List Title</label>
                    </div>
                  </div>
                  <select className="browser-default" value={this.state.listPublic} onChange={(e) => this.setState({ listPublic: e.target.value })}>
                    <option value={false}>Private (default)</option>
                    <option value={true}>Public</option>
                  </select>
                  <button type="submit" name="action" className="modal-close btn-flat right">Save</button>
                </form>
              </div>
            </div>
            {/*END LIST MODAL */}
            <div className="row valign-wrapper">
              <div id="list-section-title" className="col s10">
                <h5>Lists</h5>
                <p>View and manage your lists.</p>
              </div>
              <div className="col s2 buttons-flex">
                <a href="javascript:void(0)" data-target="modal1" className="btn-flat modal-trigger Lists--buttons"><i className="large material-icons">playlist_add</i></a>
              </div>
            </div>
            <div className="row">
              <div className="buttons-flex margin-left-10875">
                <form onSubmit={this.renderPubLists}>
                  <p className="margin-right-16">
                    <label>
                      <input name="group1" value="my-lists" type="radio" checked={this.state.selectedOption === "my-lists"} onChange={(e) => this.setState({ selectedOption: e.target.value })} />
                        <span>My Lists</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input name="group1" value='public-lists' checked={this.state.selectedOption === "public-lists"} onChange={(e) => this.setState({ selectedOption: e.target.value })} type="radio" />
                      <span>Public</span>
                    </label>
                  </p>
                </form>
                
              </div>
              
              {this.renderLists()}
            </div>
          </div>
          <div id="tab-notes" className="col s12">
            {/*NOTES MODAL STRUCTURE */}
            <div id="modalNote" className="modal">
              <div className="modal-content">
                <h4>New note...</h4>
                <form className="col s12" onSubmit={this.onNoteFormSubmit}>
                  <div className="row">
                    <div className="input-field col s12">
                      <input id="title" placeholder="Title..." value={this.state.noteTitle} type="text" onChange={(e) => this.setState({ noteTitle: e.target.value })}/>
                    </div>
                    <div className="input-field col s12">
                      <textarea id="body" placeholder="Take a note..." className="materialize-textarea" value={this.state.noteBody} onChange={(e) => this.setState({ noteBody: e.target.value })}></textarea>
                    </div>
                  </div>
                  <button type="submit" name="action" className="modal-close btn-flat right">Save Note</button>
                </form>
              </div>
            </div>
            {/*END NOTES MODAL */}
            <div className="row valign-wrapper">
              <div id="note-section-title"className="col s10">
                <h5>Notes</h5>
                <p>Manage your notes.</p>
              </div>
              <div className="col s2">
                <a href="javascript:void(0)" data-target="modalNote" className="btn-flat modal-trigger"><i id="button-addnote" className="large material-icons">note_add</i></a>
              </div>
            </div>
            <div className="row">
              {this.renderNotes()}
            </div>
          </div>
      </div>
    );
  }
}

export default Home

{/* <ul className="no-padding collapsible col s12 m12 l8">
            <li>
              <div className="collapsible-header"><i className="material-icons">favorite</i>Favorites</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">list</i>Lists</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">speaker_notes</i>Notes</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
          </ul> */}