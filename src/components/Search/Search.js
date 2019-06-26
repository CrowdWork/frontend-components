import React, { Component, Fragment } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import './Search.css'


class Search extends Component {
  state = {
    caseNameInput: "",
    citationInput: "",
    courtInput: "",
    docTypeInput: "",
    judgesInput: "",
    keywordsInput: "",
    
  }

  componentDidMount() {
    const dropdowns = document.querySelectorAll('.dropdown-trigger')
    for (let i = 0; i < dropdowns.length; i++){
      M.Dropdown.init(dropdowns[i], {
        coverTrigger: false,
        closeOnClick: false,
        alignment: 'center'
      })
    }
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
  }

  render() {
    return (
      
        <div className="row search-wrapper">
        <form id="searchForm" className="col s12 border" onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="caseNameInput" type="text" value={this.state.caseNameInput} onChange={(e) => this.setState({ caseNameInput: e.target.value })} />
                <label htmlFor="caseNameInput">Case Name</label>
              </div>
              <div className="input-field col s6">
                <input id="citationInput" type="text" value={this.state.citationInput} onChange={(e) => this.setState({ citationInput: e.target.value })} />
                <label htmlFor="citationInput">Citation</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="courtInput" type="text" value={this.state.courtInput} onChange={(e) => this.setState({ courtInput: e.target.value })} />
                <label htmlFor="courtInput">Search Court</label>
              </div>
              <div className="input-field col s6">
                <input id="keywordsInput" type="text" value={this.state.keywordsInput} onChange={(e) => this.setState({ keywordsInput: e.target.value })} />
                <label htmlFor="keywordsInput">Search Keyword(s)</label>
              </div>
            </div>
            <div className="row">
              <div className="input-field col s6">
                <input id="judgesInput" type="text" value={this.state.judgesInput} onChange={(e) => this.setState({ judgesInput: e.target.value })} />
                <label htmlFor="judgesInput">Search Judge(s)</label>
              </div>
              <div className="input-field col s6">
                <input id="docTypeInput" type="text" value={this.state.docTypeInput} onChange={(e) => this.setState({ docTypeInput: e.target.value })} />
                <label htmlFor="docTypeInput">Search Document Type</label>
              </div>
            </div>
            <button type="submit" name="action" className="waves-effect waves-light btn-large right">
              <i className="material-icons prefix">search</i>
            </button>
          </form>
        </div>
    )
  }
}

export default Search
