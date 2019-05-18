import React, { Component } from 'react'
import axios from 'axios'
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
})



class FormSignup extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }

  // Handle fields change
  handleChange = input => e => {
    this.setState({[input]: e.target.value})
  }

  handleSubmit = e => {
    e.preventDefault()
    const url = 'http://localhost:4000/users'

    axios.post(url, { ...this.state })
    .then(user => {
      console.log(user)
    })
    .catch(err => {
      console.log(err)
    })
  }

  render() {
    return (
      <React.Fragment>
        <form method='POST' onSubmit={this.handleSubmit}>
        <TextField 
          label="First Name"
          onChange={this.handleChange('firstName')}
        />
        <br/>
        <TextField 
          label="Last Name"
          onChange={this.handleChange('lastName')}
        />
        <br/>
        <TextField 
          label="Email"
          onChange={this.handleChange('email')}
        />
        <br/>
        <TextField 
          label="Password"
          onChange={this.handleChange('password')}
        />
        <br/>
        <Button
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

export default withStyles(styles)(FormSignup)
