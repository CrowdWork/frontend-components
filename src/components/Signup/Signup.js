import React from 'react'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
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
      <React.Fragment>
        <h1>Register</h1>
        <form className='form' onSubmit={this.onFormSubmit}>
        <TextField 
          label="First Name"
          name="firstName"
          any={this.state.firstName}
          onChange={(e) => this.setState({ firstName: e.target.any })}
        />
        <br/>
        <TextField 
          label="Last Name"
          name="lastName"
          any={this.state.lastName}
          onChange={(e) => this.setState({ lastName: e.target.any })}
        />
        <br/>
        <TextField 
          label="Email"
          name="email"
          any={this.state.email}
          onChange={(e) => this.setState({ email: e.target.any })}
        />
        <br/>
        <TextField 
          label="Password"
          name="password"
          any={this.state.password}
          onChange={(e) => this.setState({ password: e.target.any })}
        />
        <br/>
        <Button
          className='signupBtn'
          type='submit'
          variant='contained'
        >
          Submit
        </Button>
        </form>
        
      </React.Fragment>
        
    )
  }
    
}

export default withStyles(styles)(Signup)
