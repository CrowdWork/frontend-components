import './LegalIndex.css'
import React, { Component } from 'react'
import axios from 'axios'
import Search from '../Search/Search'
import CaseList from '../CaseList/CaseList'
import Spinner from '../Spinner/Spinner'


// const env = "http://localhost:4000"
const env = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

class LegalIndex extends Component {

  state = {
    searchResult: null,
    errorMessage: ''
  }

  onSearchSubmit = async (searchBody) => {
    for (let searchTerm in searchBody) {
      if (!searchBody[searchTerm]) {
        searchBody[searchTerm] = ''
      }
    }
    console.log(searchBody)
    
    try {
      const searchResult = await axios.get(`${env}/cases/search?query=${JSON.stringify(searchBody)}`, authHeader)
      console.log(searchResult)
      this.setState({ searchResult: searchResult.data })
    } catch (err) {
        this.setState( {errorMessage: err.message })  
    }
  }

  renderContent() {
    if (!this.state.searchResult) {
      return this.state.errorMessage ?
        (<div>Error: {this.state.errorMessage}</div>) :
        (<div>Try searching!</div>)
    }
    if (!this.state.errorMessage && this.state.searchResult) {
      return this.state.searchResult.length === 0 ?
        (<div>Search did not return a match. Please try again.</div>) :
        (<CaseList searchResult={this.state.searchResult} />)
    }

    return <div>Loading...</div>
  }

  render() {
    return (
      <div className="legal-index-wrapper center">
        <h4 className="center">Legal Index</h4>
        <Search onSubmit={this.onSearchSubmit} />
        {this.renderContent()}
      </div>
    )
  }
}

export default LegalIndex
