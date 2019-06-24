import React, { Component, Fragment } from 'react'
import M from 'materialize-css'
import moment from 'moment'
import './SearchBar.css'


class SearchBar extends Component {
  state = {
    term: '',
    caseName: false,
    citation: false,
    court: false,
    keyWords: false,
    judges: false
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

  onInputChange = e => {
    this.setState({
       term: e.target.value 
    })
    this.props.onChange(this.state.term)
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state.term)
  }

  render() {
    return (
      <Fragment>
        <div className="row">
          <form className="col s12 border" onSubmit={this.onFormSubmit}>
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input id="search-bar" type="text" value={this.state.term} className="validate" onChange={this.onInputChange} />
                <label htmlFor="search-bar">Search by {this.props.searchBy}</label>
              </div>
          </form>
        </div>
        
        {/* <div id="dropdown1" className="dropdown-content">
          <form className="col s12">
              <div className="subheader search-by-subheader">Filter by:</div>
                <div className="flex-row">
                <div className="flex-col">
                  <p>
                    <label>
                      <input type="checkbox" value={this.state.caseName} onClick={() => this.setState({ caseName: !this.state.caseName })}/>
                      <span>Case Name</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" value={this.state.citation} onClick={(e) => this.setState({ citation: !this.state.citation })}/>
                      <span>Citation</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" value={this.state.judges} onClick={() => this.setState({ judges: !this.state.judges })}/>
                      <span>Judge(s)</span>
                    </label>
                  </p>
                </div>
                <div className="flex-col">
                  <p>
                    <label>
                      <input type="checkbox" value={this.state.court} onClick={() => this.setState({ court: !this.state.court })}/>
                      <span>Court</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" value={this.state.keyWords} onClick={() => this.setState({ keyWords: !this.state.keyWords })}/>
                      <span>Keyword(s)</span>
                    </label>
                  </p>
                  <p>
                    <label>
                      <input type="checkbox" value={this.state.documentType} onClick={() => this.setState({ documentType: !this.state.documentType })}/>
                      <span>Document Type(s)</span>
                    </label>
                  </p>
                </div>
              </div>
              <div className="divider"></div>
              <div className="subheader search-by-subheader">Year(s):</div>

              <div className="divider"></div>
              <div className="subheader search-by-subheader">Search Boolean:</div>
          </form>
          </div> */}
      </Fragment>
      
      
    )
  }
}

export default SearchBar
