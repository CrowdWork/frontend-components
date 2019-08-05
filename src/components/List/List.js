import './List.css'
import Preloader from '../Preloader/Preloader' 
import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

// const url = "http://localhost:4000"
const url = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

class List extends Component {
  state = {
    list: []
  }

  componentDidMount() {
    this.fetchList()
  }

  async fetchList() {
    console.log('FETCH LIST BY ID')
    try {
      const list = await axios.get(`${url}/lists/${this.props.match.params.list_id}`, authHeader)
      this.setState({ list: list.data })
      console.log(list.data)
    } catch (err) {
      console.log(err)
    }
  }
  async removeFromList(mongo_id) {
    console.log('REMOVE CASE FROM LIST')
    const { list } = this.state
    try {
      const updatedList = await axios.get(`${url}/cases/remove/${mongo_id}/${list._id}`, authHeader)
      this.setState({ list: updatedList.data })
    } catch (err) {
      console.log(err)
    }
  }

  onListDelete() {
    const confirmDelete = prompt(
      `Note: this action cannot be undone. \nPlease type "DELETE" below to proceed.`)
    if (confirmDelete === 'DELETE') {
      this.props.deleteList(this.state.list._id)
      this.props.history.push('/')
    }
  }

  renderList() {
    const { cases } = this.state.list
    console.log(`FIRING renderList()`)
    if (cases) {
      console.log(cases)
      return cases.map(thisCase => {
        console.log(thisCase)
        return (
          <li className="card-wrapper" key={thisCase._id}>
            <div className="card horizontal">
              <div className="card-stacked">
                <div className="card-content">
                  <div>
                    <h6 className="header"><strong>{thisCase.caseName.length > 40 ? (thisCase.caseName.substring(0, 40) + '...') : (thisCase.caseName)}</strong></h6>
                    <p>{thisCase.citation}</p>
                  </div>
                  <div className="court-year">
                    <p>{thisCase.court}</p>
                    <p>{thisCase.year}</p>
                  </div>
                </div>
                <div className="card-action">
                  <Link to={`/case/${thisCase.mongo_id}`} className="left">Detail</Link>
                  <a href='javascript:void(0)' onClick={() => this.removeFromList(thisCase.mongo_id)} className="right">Remove from list</a>
                </div>
              </div>
            </div>
          </li>
        )
      })
    }
    return <Preloader />
  }
  
  render() {
    console.log("RENDER LIST")
    return (
      <div className="container">
        <div className="row">
          <div className="col s12">
            <a href="javascript:void(0)" className="go-back" onClick={this.props.history.goBack}>Back to Dashboard</a>
            <h4 id="List-title">{this.state.list.title}</h4>
            <ul>
              {this.renderList(this.state.list.cases)}
            </ul>
            {this.state.list.title === 'Favorites' ? (null):
              (<a href="javascript:void(0)" className="btn red right" onClick={() => this.onListDelete(this.state.list._id)}>Delete List</a>
            )}
          </div>
        </div>
      </div>
    )
  }
}

export default List
