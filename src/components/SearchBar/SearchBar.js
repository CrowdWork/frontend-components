import React, { Component } from 'react'

class SearchBar extends Component {
  state = {
    term: ''
  }

  onFormSubmit = event => {
    event.preventDefault()
    this.props.onSubmit(this.state.term)
  }

  render() {
    return (
      <div class="row">
        <form class="col s12">
          <div className="row">
            <div className="input-field col s12">
              <i className="material-icons prefix">search</i>
              <input id="search-bar" type="text" value={this.state.term} className="validate" onChange={(e) => this.setState({ term: e.target.value })} />
              <label htmlFor="search-bar">Search</label>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default SearchBar
