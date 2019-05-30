import React from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './Login.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class Login extends React.Component {
  state = {
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
      <React.Fragment>
        <h1>Login</h1>
        <form className='form' onSubmit={this.onFormSubmit}>
        <TextField
          label="Email"
          name="email"
          value={this.state.email}
          onChange={(e) => this.setState({ email: e.target.value })}
        />
        <br/>
        <TextField 
          label="Password"
          name="password"
          value={this.state.password}
          onChange={(e) => this.setState({ password: e.target.value })}
        />
        <br/>
        <Button
          className='loginBtn'
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

export default withStyles(styles)(Login)