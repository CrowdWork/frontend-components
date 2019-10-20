import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './Signup.css'

class Signup extends Component {

  state = {
    error: undefined
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.handleSignup({
      firstName: e.target.elements.firstName.value.trim(),
      lastName: e.target.elements.lastName.value.trim(),
      email: e.target.elements.email.value.trim(),
      password: e.target.elements.password.value.trim()
    })
  }
  render() {
    return (
      <div className="container">
        <div className="row">
          <h2 className="header offset-s3 col s6">Register</h2>
          <form className="offset-s3 col s6" onSubmit={this.onFormSubmit}>
            <div className="row">
              <div className="input-field col s6">
                <input id="firstName" type="text" name="firstName" className="validate" />
                <label htmlFor="firstName">First Name</label>
              </div>
              <div className="input-field col s6">
                <input id="lastName" type="text" name="lastName" className="validate" />
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div className="input-field col s12">
                <input id="email" type="email" name="email" className="validate" />
                <label htmlFor="email">Email</label>
              </div>
              <div className="input-field col s12">
                <input id="password" type="password" name="password" className="validate" />
                <label htmlFor="password">Password</label>
              </div>
              <div className="col s5">
                <button className="waves-effect waves-light btn" type="submit" name="action">Submit</button>
              </div>
            </div>
          </form>
        </div>
        <p className="center">Already registered? <Link to="/login" style={{textDecoration: 'underline'}}>Login</Link></p>
      </div>
        
    )
  }
    
}

export default Signup
