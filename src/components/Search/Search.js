import './Search.css'
import React, { Component, Fragment } from 'react'
import M from 'materialize-css'
import QueryRows from '../QueryExpressions/QueryExpressions'

const mappedFieldNames = {
  'Case Name': 'caseName',
  Citation: 'citation',
  Court: 'court',
  'Document Type': 'documentType',
  Judge: 'judges',
  Keyword: 'keyWords'
}

const fieldNames = [
  'Case Name', 'Citation', 
  'Court', 'Document Type', 
  'Judge', 'Keyword'
];

const queryOps = [
  'includes the word(s)', 
  'DOES NOT include the word(s)', 
  'match phrase', 
  'DOES NOT match phrase'
]

class Search extends Component {

  state = {
    fieldToSearch: 'caseName', // this is used within advanced search (basic search takes advantage of form internal state)
    logicalOperator: '', // this is used within advanced search (basic search takes advantage of form internal state)
    queryArr: [], // used to show user subqueries entered in advanced search
    queryStringAggregator: [], // query sent to elasticsearch
    rowInput: '', // this is used within advanced search (basic search takes advantage of form internal state)
    rowQuery: '', // gets constructed and pushed into queryArr
    searchCriterion: 'includes the word(s)', // this is used within advanced search (basic search takes advantage of form internal state)
    showAdvanced: false
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

  handleBasicFormSubmit = (e) => {
    console.log('handleBasicFormSubmit ran')
    e.preventDefault()
    const rowInput = e.target.elements.input.value
    const fieldToSearch = e.target.elements.fieldToSearch.value
    console.log(fieldToSearch)
    if (fieldToSearch === 'all') {
      const queryString = rowInput
      this.props.onSearchSubmit(queryString)
      
    } else {
      console.log('ALL SELECTED' + (fieldToSearch === 'all'))
      const queryString = `${fieldToSearch}: ${rowInput}`
      this.props.onSearchSubmit(queryString)
    }    
  }

  handleAddQueryRow = (e) => {
    e.preventDefault();

    const { logicalOperator, fieldToSearch, queryStringAggregator, searchCriterion, rowInput } = this.state

    if (!rowInput) return;

    if (queryStringAggregator.length > 0) {
      const rowQuery = ` ${logicalOperator} (${fieldToSearch}: ${searchCriterion === 'match phrase' ? (`"${rowInput}"`) : (rowInput)})`
      if (rowQuery) {
        this.setState((prevState) => ({
          queryStringAggregator: prevState.queryStringAggregator.concat(rowQuery)
        }));

        this.setState((prevState) => ({
          queryArr: prevState.queryArr.concat({
            logicalOperator, fieldToSearch, rowInput, searchCriterion
          })
        }));

        this.setState(() => ({
          fieldToSearch: 'caseName',
          logicalOperator: 'AND',
          rowInput: '',
          searchCriterion: 'includes the word(s)'
        }));
      };
    } else {
      const rowQuery = `(${fieldToSearch}: ${searchCriterion === 'match phrase' ? (`"${rowInput}"`) : (rowInput)})`
      if (rowQuery) {
        this.setState((prevState) => ({
          queryStringAggregator: prevState.queryStringAggregator.concat(rowQuery)
        }));

        this.setState((prevState) => ({
          queryArr: prevState.queryArr.concat({
            fieldToSearch, searchCriterion, rowInput
          })
       }));

       this.setState(() => ({
        fieldToSearch: 'caseName',
        logicalOperator: 'AND',
        rowInput: '',
        searchCriterion: 'includes the word(s)'
      }));
      };
    }
  };

  onAdvancedFormSubmit = (e) => {
    e.preventDefault();
    const { queryStringAggregator } = this.state

    if (queryStringAggregator.length > 0) {
      const queryString = queryStringAggregator
      this.props.onSearchSubmit(queryString)
    }
  }

  // TODO - IMPLEMENT THE FOLLOWING BLOCK TO DELETE SUBQUERIES IN ADVANCED SEARCH

  // handleDeleteSubQuery = (e, subQuery) => {
  //   e.preventDefault();
  //   console.log('handleDeleteSubQuery()');
  //   console.log(subQuery)
    
  //   this.setState((prevState) => ({
  //     queryArr: [].concat(prevState.queryArr.filter((i) => {
  //       return i !== subQuery;
  //     })),
  //     queryStringAggregator: [].concat(prevState.queryStringAggregator.filter((queryRow) => {
  //       return queryRow !== subQuery
  //     }))
  //   }));
  // }

  handleSearch = () => {
    console.log('handleSearch');
    let queryString = '';
    this.state.queryStringAggregator.forEach(q => queryString += q);
    console.log(queryString);
    this.props.onSearchSubmit(queryString);
  }

  handleReset = () => {
    console.log('handleReset')
    this.setState(() => ({
      logicalOperator: '',
      rowInput: '',
      rowQuery: '',
      queryStringAggregator: [],
      queryArr: []
    }))
  }

  renderFieldOptions = () => {
    return fieldNames.map(option => <option value={mappedFieldNames[option]} key={Math.floor(Math.random() * 1000000)}>{option}</option>);
  }

  renderQueryOperators = () => {
    return queryOps.map(option => <option key={Math.floor(Math.random() * 1000000)}>{option}</option>);
  }
  
  handleToggleAdvanced = () => {
    this.handleReset();
    
    this.setState((prevState) => ({
      showAdvanced: !prevState.showAdvanced,
    }))
  }

  render() {
    console.log(`queryStringAggregator: ${this.state.queryStringAggregator}`);

    return (
      <div className="display-flex flex-column">
        <h1 className="center h1-search">Legal Index</h1>
        <div className="display-flex flex-column flex-justify-center flex-align-center">
          
        {!this.state.showAdvanced ? (
          <Fragment>
          <form className="border basic-form" onSubmit={this.handleBasicFormSubmit}>
            <div className="search-box-wrapper">
              <div className="input-field width-full">
                <input type="text" id="rowInput" placeholder="Search" required className="inputs" name="input" />
              </div>
              <div className="input-field">
                <select defaultValue="all" className="browser-default" name="fieldToSearch">
                  <option value="all">All</option>
                  <Fragment>
                    {this.renderFieldOptions()}
                  </Fragment>
                </select>
              </div>
              <div className="buttons-flex">
                <button type="button" className="btn-floating btn-flat Lists--buttons" onClick={this.handleReset}>Reset</button>
                <button type="submit" name="action" className="btn-floating btn Lists--buttons"><i className="material-icons">search</i></button>
              </div>
            </div>

          </form>
          <button type="button" onClick={this.handleToggleAdvanced} className="toggle-search-type">
            {this.state.showAdvanced ? 'Basic Search' : 'Advanced Search'}
          </button>
          </Fragment>

          ) : (

            // =================== ADVANCED SEARCH ==============================
            <Fragment>
            <form className="advanced-form" onSubmit={this.onAdvancedFormSubmit}>
            <div className="select-wrapper">
              <div className="input-field width-full">
                <input 
                  className="inputs"
                  id="rowInput" 
                  onChange={(e) => this.setState({ rowInput: e.target.value })}
                  placeholder="Search" 
                  required={this.state.queryStringAggregator.length < 1}
                  type="text" 
                  value={this.state.rowInput}
                />
              </div>
              <div className="input-field">
                {this.state.queryStringAggregator.length > 0 && (
                <div className="query-input">
                  
                  <select value={this.state.logicalOperator} name="operator" className="browser-default" onChange={(e) => this.setState({ logicalOperator: e.target.value })}>
                    <option value="AND">AND</option>
                    <option value="OR">OR</option>
                  </select>
                </div>
                )}
              </div>
              <div className="input-field">
                <div className="query-input">
                  <select value={this.state.fieldToSearch} className="browser-default" name="fieldToSearch" onChange={(e) => this.setState({ fieldToSearch: e.target.value })}>
                    <Fragment>
                      {this.renderFieldOptions()}
                    </Fragment>
                  </select>
                </div>
              </div>
              <div className="input-field">
                <div className="query-input">
                  <select value={this.state.searchCriterion} className="browser-default" name="searchCriterion" onChange={(e) => this.setState({ searchCriterion: e.target.value })}>
                    <Fragment>
                      {this.renderQueryOperators()}
                    </Fragment>
                  </select>
                </div>
              </div>
              <div className="query-action-wrapper width-full">
                <div>
                  <button type="button" className="btn" onClick={this.handleReset}>Reset</button>
                  <button type="button" className="btn" onClick={this.handleAddQueryRow}>Add</button>
                </div>
                <button type="submit" name="action" className="waves-light btn"><i className="material-icons">search</i></button>
              </div>
            </div>        
          </form>
          
          <button type="button" onClick={this.handleToggleAdvanced} className="toggle-search-type">
            {this.state.showAdvanced ? 'Basic Search' : 'Advanced Search'}
          </button>
            </Fragment>
          
          )}
        </div>
        
        <QueryRows
          {...this.state}
          renderFieldOptions={this.renderFieldOptions}
          renderQueryOperators={this.renderQueryOperators}
          handleDeleteSubQuery={this.handleDeleteSubQuery}
        />
      </div>
    )
  }
}

export default Search
