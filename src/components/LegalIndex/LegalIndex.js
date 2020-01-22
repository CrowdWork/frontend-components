import './LegalIndex.css'
import React, { Component } from 'react'
import Filter from '../Filter';
import ListCard from '../ListCard/ListCard'
import Search from '../Search/Search'
import EsCaseList from '../EsCaseList/EsCaseList'
import M from 'materialize-css'
import NotesModal from "../Modal/NotesModal"

class LegalIndex extends Component {

  state = {
    listTitle: '',
    listPublic: false,
    selectedOption: 'my-lists',
    noteType: "legalIndex",
    filterString: ''
  }

  componentDidMount() {
    // const elems = document.querySelectorAll('.collapsible')
    // M.Collapsible.init(elems)
    
    const tooltips = document.querySelectorAll('.tooltipped')
    for (let i = 0; i < tooltips.length; i++){
      M.Tooltip.init(tooltips[i])
    }
    const tabs = document.querySelectorAll('.tabs')
    M.Tabs.init(tabs)
    const modals = document.querySelectorAll('.modal')
    for (let i = 0; i < modals.length; i++){
      M.Modal.init(modals[i])
    }
  }

  handleInputChange = (e) => {
    e.persist()
    const filterString = e.target.value.trim().toLowerCase()
    this.setState(() => ({ filterString }))
  }

  onPubListSelected = (e) => {
    e.persist()
    this.setState(() => ({ selectedOption: e.target.value }));
    this.props.fetchPubLists();
  }
  onMyListSelected = (e) => {
    e.persist()
    this.setState(() => ({ selectedOption: e.target.value }));
    this.props.getMyLists();
    
  }

  renderLists() {
    const { filterString } = this.state
    const { lists } = this.props
    if (!lists.length) return <p className="center-align">Use the button on the right to create a new list.</p>

    if (filterString) {
      return lists.filter(list => (
        list.title.toLowerCase().includes(filterString)))
        .map(list => (
          <div className="list-card" key={list._id}>
            <ListCard
              listRoute={`/list/${list._id}`}
              title={list.title}
              isPublic={list.public}
              length={list.cases.length}
            />
          </div>
        ))
    }
    return lists.map(list => (
      <div className="list-card" key={list._id}>
        <ListCard
          listRoute={`/list/${list._id}`}
          title={list.title}
          isPublic={list.public}
          length={list.cases.length}
        />
      </div>
    ))
  }

  renderNotes() {
    const { notes } = this.props
    if (notes) {
      return notes.map(note => {
        return (
          <div className="list-card" key={note._id}>
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

  renderContent = () => {
    const { errorMessage, esSearchResults, searchAttempted, batchedSearchResults, sizeLimit, loadMoreResults, onFetchCase, onLimitChange } = this.props
    if (esSearchResults.length === 0 && !searchAttempted) {
      return errorMessage ?
        (<div>Error: {errorMessage}</div>) :
        (<div className="center">Try searching!</div>)
    }
    if (searchAttempted && !errorMessage) {
      console.log(batchedSearchResults)
      return esSearchResults.length === 0 ?
        (<div className="center">Search did not return a match. Please try again.</div>) :
        (<EsCaseList
          esSearchResults={esSearchResults}
          batchedSearchResults={batchedSearchResults}
          sizeLimit={sizeLimit}
          loadMoreResults={loadMoreResults}
          onFetchCase={onFetchCase}
          onLimitChange={onLimitChange}
        />)
    }
    if (errorMessage) {
      return <div>Error: {errorMessage}</div>
    }

    return <div>Loading...</div>
  }
  render() {
    return (
      <div>
        {/* Tabs  */}
        <ul id="tabs-swipe-demo" className="tabs tabs-fixed-width col s12">
          <li className="tab col s4"><a href="#tab-search" className="active">Search</a></li>
          <li className="tab col s4"><a href="#tab-lists">Lists</a></li>
          <li className="tab col s4"><a href="#tab-notes">Notes</a></li>
        </ul>

        <div id="tab-search" className="col s12">
          <div className="container">
            <div className="row">
              <div className="col s12">
                <Search 
                  onSearchSubmit={this.props.onSearchSubmit}
                />
              </div>
            </div>
          <div className="row">
            {this.renderContent()}
          </div>
          </div>
        </div>

        <div id="tab-lists" className="col s12">
          <div className="container">
            <div className="row">

              <div className="buttons-flex">
                <h5>My Case Collections</h5>
                <form>
                  <p className="margin-right-16">
                    <label>
                      <input name="group1" value="my-lists" type="radio" checked={this.state.selectedOption === "my-lists"} onChange={(e) => this.onMyListSelected(e)} />
                        <span>My Lists</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input name="group1" value='public-lists' checked={this.state.selectedOption === "public-lists"} onChange={(e) => this.onPubListSelected(e)} type="radio" />
                      <span>Public Lists</span>
                    </label>
                  </p>
                </form>
                <a href="#" data-target="modal1" className="btn-floating btn modal-trigger Lists--buttons">New List</a>
              </div>
              <Filter handleInputChange={this.handleInputChange}/>

              {this.renderLists()}
            </div>
            </div>


            {/*LIST MODAL STRUCTURE */}
            <div id="modal1" className="modal">
              <div className="modal-content">
                <h4>New list...</h4>
                <form onSubmit={(e) => this.props.onAddList(e, this.state)}>
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
            

        </div>
          <div id="tab-notes" className="col s12">
            <div className="container">
              <div className="row">
                <div className="buttons-flex">
                  <h5>My Notes</h5>
                  <a href="#" data-target="modalNote" className="btn-floating btn modal-trigger Lists--buttons">New Note</a>
                </div>
                {this.renderNotes()}
              </div>
            </div>


            {/*NOTES MODAL STRUCTURE */}
              <NotesModal 
                noteType={this.state.noteType} 
                onAddNote={this.props.onAddNote}
              />
            {/*
            <div id="modalNote" className="modal">
              <div className="modal-content">
                <h4>New note...</h4>
                <form className="col s12" onSubmit={(e) => this.props.onAddNote(e, this.state)}>
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
            */}
            {/*END NOTES MODAL */}


            
          </div>
      </div>
    )
  }
}

export default LegalIndex;
