import React, { Component, Fragment } from 'react'
import axios from 'axios'
import SearchBar from '../SearchBar/SearchBar'
import CaseList from '../CaseList/CaseList'

// const env = "http://localhost:4000"
const env = "https://ble-backend.herokuapp.com"

const authHeader = { 
  headers: {
  'Authorization': localStorage.token
}}

class LegalIndex extends Component {

  state = {
    cases: []
  }

  onSearchSubmit = async term => {

    try {
      const searchResult = await axios.get(`${env}/cases/search?query=${term}`)
      console.log(searchResult.data)
      this.setState({
        cases: searchResult.data
      })
    } catch (err) {
      console.log(err)
    }
    
  }

  render() {
    return (
      <Fragment>
        <h2 className="center">Case Finder</h2>
        <SearchBar onSubmit={this.onSearchSubmit} onChange={this.onSearchSubmit}/>
        <CaseList cases={this.state.cases} />
      </Fragment>
    )
  }
}

export default LegalIndex
