import './Search.css'
import React, { Component, Fragment } from 'react'
import M from 'materialize-css'

const mappedFieldNames = {
  'Case Name': 'caseName',
  Citation: 'citation',
  Court: 'court',
  'Document Type': 'documentType',
  Judge: 'judges',
  Keyword: 'keyWords'
}

class Search extends Component {
  state = {
    userQuery: '',
    fieldToSearch: 'caseName',
    fieldNames: ['Case Name', 'Citation', 'Court', 'Document Type', 'Judge', 'Keyword'],
    queryOps: ['matches one or more words', 'matches phrase'],
    matchPhrase: false,
    searchCriterion: 'matches one or more words',
    logicalOperator: '',
    rowInput: '',
    rowQuery: ''
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

  onAddQueryRow = () => {
    
    this.setState({
      rowQuery: this.state.rowQuery += ` ${this.state.logicalOperator} (${this.state.fieldToSearch}:${this.state.matchPhrase ? (`"${this.state.rowInput}"`):(this.state.rowInput)})`
    })
    this.setState({
      userQuery: this.state.userQuery += this.state.rowQuery
    })
    this.setState({
      fieldToSearch: 'caseName',
      logicalOperator: 'AND',
      searchCriterion: 'matches one or more words',
      matchPhrase: false,
      rowQuery: '',
      rowInput: ''
    })
    return (
      <div className="row">
        <div className="input-field col s2">
          <select className="browser-default" value={this.state.logicalOperator} onChange={(e) => this.setState({ logicalOperator: e.target.value })}>
            <option value="AND">AND</option>
            <option value="AND NOT">AND NOT</option>
            <option value="OR">OR</option>
            <option value="OR NOT">OR NOT</option>
          </select>
        </div>
        <div className="input-field col s2">
          <select className="browser-default" value={this.state.fieldToSearch} onChange={(e) => this.setState({ fieldToSearch: e.target.value })}>
            {this.renderFieldOptions()}
          </select>
        </div>
        <div className="input-field col s3">
          <select className="browser-default" onChange={(e) => this.setState({ searchCriterion: e.target.value, matchPhrase: !this.state.matchPhrase })}>
            {this.renderQueryOperators()}
          </select>
        </div>
        <div className="input-field col s5">
          <input require id="rowInput" className="inputs" type="text" value={this.state.rowInput} onChange={(e) => this.setState({ rowInput: e.target.value })} />
          <label htmlFor="rowInput"></label>
        </div>
      </div>
    )
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.userQuery)
    this.setState({
      fieldToSearch: 'caseName',
      logicalOperator: '',
      searchCriterion: 'matches one or more words',
      matchPhrase: false,
      rowQuery: '',
      rowInput: '',
      userQuery: '',
      visibleRows: []
    })
  }

  renderFieldOptions = () => {
    const { fieldNames } = this.state
    return fieldNames.map(option => <option value={mappedFieldNames[option]} key={Math.floor(Math.random() * 1000000)}>{option}</option>)
  }

  renderQueryOperators = () => {
    const { queryOps } = this.state
    return queryOps.map(option => <option key={Math.floor(Math.random() * 1000000)}>{option}</option>)
  }

  renderVisibleRows = () => {
    const { visibleRows } = this.state
    return visibleRows.map(visibleRow => visibleRow)
  }

  render() {
    return (
      <div className="container">
        <h4>Query Builder</h4>
        {this.state.userQuery && <p>{this.state.userQuery}</p>}
        <form className="col s12 border" onSubmit={this.onFormSubmit}>
          {/* QUERY STATEMENT STRUCTURE FOR EACH ROW */}
          {/* TODO - Add function that keeps adding rows (items) to the query array */}
            <div className="row valign-wrapper">
              {this.state.userQuery && (
              <div className="input-field col s2">
                <select className="browser-default" value={this.state.logicalOperator} onChange={(e) => this.setState({ logicalOperator: e.target.value })}>
                  <option value="AND">AND</option>
                  <option value="AND NOT">AND NOT</option>
                  <option value="OR">OR</option>
                  <option value="OR NOT">OR NOT</option>
                </select>
              </div>
              )}
              <div className="input-field col s2 offset-s2">
                <select className="browser-default" value={this.state.fieldToSearch} onChange={(e) => this.setState({ fieldToSearch: e.target.value})}>
                  <Fragment>
                    {this.renderFieldOptions()}
                  </Fragment>
                </select>
              </div>
              <div className="input-field col s3">
                <select className="browser-default" value={this.state.searchCriterion} onChange={(e) => this.setState({ searchCriterion: e.target.value, matchPhrase: !this.state.matchPhrase })}>
                  <Fragment>
                    {this.renderQueryOperators()}
                  </Fragment>
                </select>
              </div>
              <div className="input-field col s5">
                <input id="rowInput" className="inputs" type="text" value={this.state.rowInput} onChange={(e) => this.setState({ rowInput: e.target.value })} />
                <label htmlFor="rowInput"></label>
              </div>
              {/* <div className="input-field col s12 m6">
                <input id="citationInput" type="text" value={this.state.citationInput} onChange={(e) => this.setState({ citationInput: e.target.value })} />
                <label htmlFor="citationInput">Citation(s)</label>
              </div> */}
            </div>
            <div className="row">
              <div className="col s2">
                <button type="button" className="btn" onClick={this.onAddQueryRow}>More</button>
              </div>
            </div>
            {/* <div className="row">
              <div className="input-field col s12 m6">
                <input id="courtInput" type="text" value={this.state.courtInput} onChange={(e) => { this.setState({ courtInput: e.target.value })}} />
                <label htmlFor="courtInput">Court(s)</label>
              </div>
              <div className="input-field col s12 m6">
                <input id="keywordsInput" type="text" value={this.state.keywordsInput} onChange={(e) => this.setState({ keywordsInput: e.target.value })} />
                <label htmlFor="keywordsInput">Keyword(s)</label>
              </div>
            </div> */}
            {/* <div className="row">
              <div className="input-field col s12 m6">
                <input id="judgesInput" type="text" value={this.state.judgesInput} onChange={(e) => this.setState({ judgesInput: e.target.value })} />
                <label htmlFor="judgesInput">Judge(s)</label>
              </div>
              <div className="input-field col s12 m6">
                <input id="docTypeInput" type="text" value={this.state.docTypeInput} onChange={(e) => this.setState({ docTypeInput: e.target.value })} />
                <label htmlFor="docTypeInput">Document Type(s)</label>
              </div>
            </div> */}
            <button type="submit" name="action" className="waves-light btn-large center">
              Search
            </button>
          </form>
        </div>
    )
  }
}

export default Search
