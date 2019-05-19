import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'
import './FormLogin.css'

const styles = theme => ({
  root: {
    display: 'flex',
    flexDirection: 'column'
  }
})


const FormLogin = (props) => {
console.log(props)

  const handleSubmit = e => {
    e.preventDefault()
    props.handleLogin()
    props.history.push("/admin")
  }

    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className='form' method='POST' onSubmit={handleSubmit}>
        <TextField 
          label="Email"
          name="email"
          onChange={props.handleInput('email')}
        />
        <br/>
        <TextField 
          label="Password"
          name="password"
          onChange={props.handleInput('password')}
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

export default withStyles(styles)(FormLogin)