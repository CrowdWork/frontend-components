import './Search.css'
import React, { Component, Fragment } from 'react'
import M from 'materialize-css'
import QueryRows from '../QueryRows/QueryRows'

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
    queryStringAggregator: [],
    queryArr: [],
    rowQuery: '',
    fieldNames: ['Case Name', 'Citation', 'Court', 'Document Type', 'Judge', 'Keyword'],
    queryOps: ['includes the word(s)', 'DOES NOT include the word(s)', 'match phrase', 'DOES NOT match phrase']
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

  onFormSubmit = async (e) => {
    e.preventDefault();

    if (this.state.queryStringAggregator.length > 0) {
      const logicalOperator = e.target.elements.operator.value
      const rowInput = e.target.elements.input.value
      const fieldToSearch = e.target.elements.fieldToSearch.value
      const searchCriterion = e.target.elements.searchCriterion.value
      const rowQuery = ` ${logicalOperator} (${fieldToSearch}: ${searchCriterion === 'match phrase' ? (`"${rowInput}"`) : (rowInput)})`
      
      if (rowQuery) {
        this.setState({ queryStringAggregator: this.state.queryStringAggregator.concat(rowQuery) })
        this.setState({
           queryArr: this.state.queryArr.concat({ 
             logicalOperator, fieldToSearch, rowInput, searchCriterion
           }) 
        })
      };

      e.target.elements.input.value = ''
      e.target.elements.operator.value = 'OR'
      e.target.elements.fieldToSearch.value = ''
      e.target.elements.searchCriterion.value = ''

    } else {
      const rowInput = e.target.elements.input.value
      const fieldToSearch = e.target.elements.fieldToSearch.value
      const searchCriterion = e.target.elements.searchCriterion.value
      const rowQuery = `(${fieldToSearch}: ${searchCriterion === 'match phrase' ? (`"${rowInput}"`) : (rowInput)})`
      
      if (rowQuery) {
        this.setState({
          queryStringAggregator: this.state.queryStringAggregator.concat(rowQuery) 
        })
        this.setState({
          queryArr: this.state.queryArr.concat({
            fieldToSearch, searchCriterion, rowInput
          }) 
       })
      };
      e.target.elements.input.value = ''
    }
  }

  handleSearch = () => {
    console.log('handleSearch')
    let queryString = ''
    this.state.queryStringAggregator.forEach(q => queryString += q)
    console.log(queryString)
    this.props.onSearchSubmit(queryString)

    this.setState({
      // rowQuery: '',
      // queryStringAggregator: [],
      // queryArr: []
    })
  }

  handleReset = () => {
    console.log('handleReset')
    this.setState({
      rowQuery: '',
      queryStringAggregator: [],
      queryArr: []
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

  

  render() {
    console.log(`queryStringAggregator: ${this.state.queryStringAggregator}`)
    return (
      <div>
        
        {/* QUERY FORM */}
        <form className="col s12 border query-form" onSubmit={this.onFormSubmit}>
            <div className="select-wrapper">
              <div className="input-field">
              {this.state.queryStringAggregator.length > 0 ? (
                <div className="query-input">
                  <label>Operator</label>
                  <select name="operator" className="browser-default">
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                </div>
              ):(null)}
              </div>
              <div className="input-field">
                <div className="query-input">
                  <label>Field</label>
                  <select className="browser-default" name="fieldToSearch">
                    <Fragment>
                      {this.renderFieldOptions()}
                    </Fragment>
                  </select>
                </div>
              </div>
              <div className="input-field">
                <div className="query-input">
                  <label>Condition</label>
                  <select className="browser-default" name="searchCriterion">
                    <Fragment>
                      {this.renderQueryOperators()}
                    </Fragment>
                  </select>
                </div>
              </div>
              <div className="input-field width-full">
                <input id="rowInput" placeholder="Type" required className="inputs" type="text" name="input" />
                <label htmlFor="rowInput"></label>
              </div>
              </div>
                       
            <div className="query-action-wrapper width-full">
              <button type="button" className="btn" onClick={this.handleReset}>Reset</button>
              <button type="submit" className="btn">Add</button>
              <button disabled={!this.state.queryStringAggregator.length} type="button" name="action" className="waves-light btn" onClick={this.handleSearch}>
                Search
              </button>
            </div>
        </form>
        <QueryRows
          {...this.state}
          renderFieldOptions={this.renderFieldOptions}
          renderQueryOperators={this.renderQueryOperators}
        />
        </div>
    )
  }
}

export default Search
