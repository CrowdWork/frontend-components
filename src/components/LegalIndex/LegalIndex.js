import React, { Component } from 'react'
import axios from 'axios'
import Search from '../Search/Search'
import CaseList from '../CaseList/CaseList'
import './LegalIndex.css'

const env = "http://localhost:4000"
// const env = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

class LegalIndex extends Component {

  state = {
    searchResult: []
  }

  onSearchSubmit = async (searchBody) => {
    console.log(searchBody)
    for (let searchTerm in searchBody) {
      if (!searchBody[searchTerm]) {
        searchBody[searchTerm] = ''
      }
    }
    console.log(searchBody)
    
    try {
      const searchResult = await axios.get(`${env}/cases/search?query=${JSON.stringify(searchBody)}`, authHeader)
      console.log(searchResult)
      this.setState({
        searchResult: searchResult.data.sort((a, b) => {
          return a.year - b.year
        })
      })
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="legal-index-wrapper center">
        <h4 className="center">Legal Index</h4>
        <Search onSubmit={this.onSearchSubmit} />
        <CaseList searchResult={this.state.searchResult} />
      </div>
    )
  }
}

export default LegalIndex
