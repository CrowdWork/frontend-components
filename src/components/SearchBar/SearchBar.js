import React, { Component, Fragment } from 'react'

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
      <Fragment>
        <div class="row">
          <form class="col s12">
            <div className="row">
              <div className="input-field col s12">
                <i className="material-icons prefix">search</i>
                <input id="search-bar" type="text" value={this.state.term} data-target='dropdown1' className="dropdown-trigger validate" onChange={(e) => this.setState({ term: e.target.value })} />
                <label htmlFor="search-bar">Search</label>
              </div>
            </div>
          </form>
        </div>
        <div className="row">
          <ul id='dropdown1' class='dropdown-content'>
            <li><a href="#!">one</a></li>
            <li><a href="#!">two</a></li>
            <li class="divider" tabindex="-1"></li>
            <li><a href="#!">three</a></li>
            <li><a href="#!"><i class="material-icons">view_module</i>four</a></li>
            <li><a href="#!"><i class="material-icons">cloud</i>five</a></li>
          </ul>
        </div>
      </Fragment>
      
      
    )
  }
}

export default SearchBar
