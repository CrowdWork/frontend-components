import React, { Component } from 'react'

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
        <h1>Login</h1>
        <form className="col s12" onSubmit={this.onFormSubmit}>
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
          <button className="waves-effect waves-light btn right" type="submit" name="action">Submit</button>
        </form>
      </div>
    )
  }
    
}

export default Login