import React from 'react'
import './Signup.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class Signup extends React.Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  onFormSubmit = e => {
    e.preventDefault()
    this.props.handleSignup()
    this.props.history.push("/")
  }
  render() {
    return (
      <div className="container" onSubmit={this.onFormSubmit}>
        <h1>Register</h1>
        <form className="col s12">

          <div class="row">
            <div class="input-field col s6">
              <input id="firstName" type="text" class="validate" />
              <label htmlFor="firstName">First Name</label>
            </div>
            <div class="input-field col s6">
              <input id="last_name" type="text" class="validate" />
              <label for="last_name">Last Name</label>
            </div>
          </div>

          <div className="row">
            <div className="input-field col s12">
              <input id="email" type="email" className="validate" />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="row">
            <div className="input-field col s12">
              <input id="password" type="password" className="validate" />
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
