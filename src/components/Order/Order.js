import React, { Component } from 'react'

 class Order extends Component {
  state = {

  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit()
  }

  render() {
    return (
      <div className="container center">
        <h3>Test Subscription</h3>
        <p>Must be registered</p>

        <div className="row">
          <form onSubmit={this.onFormSubmit} className="col s12">
            <button type="submit" name="action" className="btn-large">Test Subscription</button>
          </form>
        </div>
        
        
      </div>
    )
  }
  
}
export default Order