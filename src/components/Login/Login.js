import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
  state = {
    error: undefined
  }

  onFormSubmit = (e) => {
    e.preventDefault()
    this.props.handleLogin({
      email: e.target.elements.email.value.trim(),
      password: e.target.elements.password.value.trim()
    })
  }
  

  render() {
    console.log(this.props)
    return (
      <div className="container">
        
        <div className="container">
          <div className="row">
            <h2 className="header col s12">Login</h2>
            <form onSubmit={this.onFormSubmit}>
              <div className="input-field col s12">
                <input id="email" type="email" name="email" className="validate" required />
                <label htmlFor="email">Email</label>
              </div>
              
                <div className="input-field col s12">
                  <input id="password" type="password" name="password" className="validate" required />
                  <label htmlFor="password">Password</label>
                </div>
            
              <div className="col s12">
                <button className="waves-effect waves-light btn left" type="submit" name="action">Login</button>
              </div>
            </form>
          </div>
          
        </div>
        <p className="center">Not registered yet? <Link to="/signup" style={{textDecoration: 'underline'}}>Register now.</Link></p>
      </div>
    )
  }
    
}

export default Login