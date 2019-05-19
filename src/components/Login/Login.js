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


const Login = ({handleInput, handleLogin, history}) => {
  console.log(handleInput)

  const handleSubmit = e => {
    e.preventDefault()
    handleLogin()
    history.push("/")
  }

    return (
      <React.Fragment>
        <h1>Login</h1>
        <form className='form' method='POST' onSubmit={handleSubmit}>
        <TextField
          label="Email"
          name="email"
          onChange={handleInput('email')}
        />
        <br/>
        <TextField 
          label="Password"
          name="password"
          onChange={handleInput('password')}
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

export default withStyles(styles)(Login)