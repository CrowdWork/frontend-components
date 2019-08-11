import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class Login extends Component {
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
    console.log(this.props)
    return (
      <div className="container">
        <h1 className="center"></h1>
        <div className="row">
        <form className="col s12 m6 offset-m3" onSubmit={this.onFormSubmit}>
          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" value={this.state.email} className="validate" onChange={(e) => this.setState({ email: e.target.value })} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" value={this.state.password} className="validate" onChange={(e) => this.setState({ password: e.target.value })} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="row">
            <button className="waves-effect waves-light btn left" type="submit" name="action" style={{width: '100%'}}>Login</button>
          </div>
        </form>
        </div>
        <p className="center">Not registered yet? <Link to="/signup" style={{textDecoration: 'underline'}}>Register now.</Link></p>
      </div>
    )
  }
    
}

export default Login