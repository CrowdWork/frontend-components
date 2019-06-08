import React, { Component } from 'react'
import './Signup.css'

class Signup extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.onSubmit(this.state)
    this.props.history.push("/")
  }
  render() {
    return (
      <div className="container">
        <h1>Register</h1>
        <form className="col s12" onSubmit={this.onFormSubmit}>

          <div className="row">
            <div className="input-field col s6">
              <input id="firstName" type="text" className="validate" value={this.state.firstName} onChange={(e) => this.setState({ firstName: e.target.value })} />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div className="input-field col s6">
              <input id="lastName" type="text" className="validate" value={this.state.lastName} onChange={(e) => this.setState({ lastName: e.target.value })} />
              <label htmlFor="lastName">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" value={this.state.email} onChange={(e) => this.setState({ email: e.target.value })}/>
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" value={this.state.password} onChange={(e) => this.setState({ password: e.target.value })}/>
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <button className="waves-effect waves-light btn right" type="submit" name="action">Submit</button>
        </form>
      </div>
        
    )
  }
    
}

export default Signup
