import './CaseDetail.css'
import M from 'materialize-css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

class CaseDetail extends Component {

  state = {
    caseDetail: '',
    listId: ''
  }

  componentDidMount() {
    console.log('CASE DETAIL MOUNTED')
    this.fetchCase()
    const modals = document.querySelectorAll('.modal')
    for (let i = 0; i < modals.length; i++){
      M.Modal.init(modals[i])
    }
    const select = document.querySelectorAll('select')
    for (let i = 0; i < select.length; i++){
      M.FormSelect.init(select[i])
    }
  }

  fetchCase = async () => {
    console.log('fetchCase()')
    try {
      const getCase = await axios.get(`${url}/cases/detail/${this.props.match.params.mongo_id}`)
      const fetchedCase = getCase.data
      console.log(fetchedCase)
      for (const prop in fetchedCase) {
        if (Array.isArray(fetchedCase[prop])) {
          fetchedCase[prop] = fetchedCase[prop].join().split(',')
        }
      }
      this.setState({
        caseDetail: fetchedCase
      })
      
    } catch (err) {
      console.log(err)
    }
  }

  renderJudges = () => {
    const { caseDetail } = this.state
    if (caseDetail) {
      return caseDetail.judges.map(judge => <li key={caseDetail.judges.indexOf(judge)}>{judge}</li>)
    }
  }

  renderKeywords = () => {
    const { caseDetail } = this.state
    if (caseDetail) {
      return caseDetail.keyWords.map(keyWord => <li key={Math.floor(Math.random() * 1000000)}>{keyWord}</li>)
    }
  }

  renderListOptions = (lists) => {
    console.log('renderListOptions()')
    console.log(lists)
    if (lists) {
      const myOptions = lists.map(list => <option value={list._id} key={Math.floor(Math.random() * 1000000)}>{list.title}</option>)
      console.log(myOptions)
      return myOptions
    }
  }

  addToList = async (e) => {
    console.log('Modal Form Submitted')
    e.preventDefault()
    const { caseDetail, listId } = this.state
    try {
      await axios.get(`${url}/cases/add/${caseDetail.mongo_id}/${listId}`, authHeader)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    console.log('RENDER CASE DETAIL')
    return (
      <div id="CaseDetail-container" className="container">

      {/*MODAL STRUCTURE */}
  <div id="modal1" className="modal">
    <div className="modal-content">
      <h4>I want to...</h4>
      <form onSubmit={this.addToList}>
        <label>Add this case to a list</label>
        <select className="browser-default" value={this.state.listId} onChange={(e) => this.setState({ listId: e.target.value })}>
          <option value="" disabled>Select a list...</option>
          {this.renderListOptions(this.props.lists)}
        </select>
        
        <button type="submit" name="action" className="modal-close btn-flat right">Save</button>
      </form>
    </div>
    
  </div>
      {/*END MODAL */}

        <div id="card-panel-wrapper" className="col s12 m5">
          <Link to="javascript:void(0)" className="go-back" onClick={this.props.history.goBack}>Back to results</Link>
          <div className="flex-space-btw">
            <h5>{this.state.caseDetail.caseName}</h5>
            <div>
              <button data-target="modal1" className="btn btn-large modal-trigger"><i className="large material-icons">playlist_add</i></button>
            </div>
          </div>

          <div className="card-panel white">
            <h6>Citation</h6>
            <p>{this.state.caseDetail.citation}</p>
            <div className="divider" />
            <h6>Court</h6>
            <p>{this.state.caseDetail.court}</p>
            <div className="divider" />
            <h6>Type of Document</h6>
            <p>{this.state.caseDetail.documentType}</p>
            <div className="divider" />
            <h6>Judge(s)</h6>
            <p>{this.renderJudges()}</p>
            <div className="divider" />
            <h6>Keyword(s)</h6>
            <p>{this.renderKeywords()}</p>
            <div className="divider" />
            <h6>Summary</h6>
            <p>{this.state.caseDetail.summary}</p>
            <div className="divider" />
            <h6>Cases Referred To</h6>
            <p>Coming Soon!</p>
          </div>
        </div>
      </div>
    )
  }
}

export default CaseDetail
