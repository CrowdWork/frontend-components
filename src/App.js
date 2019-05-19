import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import Header from './components/Header/Header'
import FormContainer from './components/FormContainer'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import AdminConsole from './components/AdminConsole/AdminConsole'
import './App.css'

// const env = "http://localhost:4000"
const env = "https://ble-backend.herokuapp.com"

class App extends Component {
  state = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    isLoggedIn: false,
    signupError: null,
    loginError: null,
    userID: null,
  }

  componentDidMount() {
    console.log(localStorage)
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true,
        userID: decode(localStorage.token)
      })
    } else {
      this.setState({
        isLoggedIn: false,
        userID: null
      })
    }
  }

  // Handle user input
  handleInput = input => e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  handleSignup = () => {
    axios.post(`${env}/users`, {
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      email: this.state.email,
      password: this.state.password
    })
      .then(response => {
        localStorage.token = response.data.token
        this.setState({
          isLoggedIn: true,
          userID: decode(localStorage.token)
        })
      })
      .catch(err => {
        console.log(err)
        this.setState({
          signupError: err
        })
      });
  }

  handleLogin = () => {
    axios.post(`${env}/users/login`, {
      email: this.state.email,
      password: this.state.password
    })
      .then(res => {
        console.log(res.data.user.firstName)
        localStorage.token = res.data.token
        this.setState({
          firstName: res.data.user.firstName,
          lastName: res.data.user.lastName,
          isLoggedIn: true
        })
        console.log(this.state)
      })
      .catch(err => this.setState({
        loginError: err.res
      }))
  }

  handleLogout = () => {
    this.setState({
      email: "",
      password: "",
      isLoggedIn: false,
      userID: null
    })
    localStorage.clear()
  }

  render() {
    return (
      <div className="App-container">
        <Header 
          isLoggedIn={this.state.isLoggedIn}
          handleLogin={this.handleLogin}
          handleLogout={this.handleLogout}
          handleSignup={this.handleSignup}
        />
        <main>
          <Switch>
            <Route path="/signup"
              render={(props) => (
                <FormContainer>
                  <Signup {...props} handleInput={this.handleInput} handleSignup={this.handleSignup}/>
                </FormContainer>
              )}
            />
            <Route path="/login"
              render={(props) => (
                <FormContainer>
                  <Login 
                    {...props}
                    handleInput={this.handleInput}
                    handleLogin={this.handleLogin}
                  />
                </FormContainer>
              )}
            />
            <Route 
              exact path="/"
              render={(props) => !this.state.isLoggedIn 
              ? <Redirect to="/login" {...props}  />
              : <AdminConsole 
                  to="/admin"
                  firstName={this.state.firstName}
                  isLoggedIn={this.state.isLoggedIn}
                  handleLogout={this.handleLogout}
                />
              }
            />
          </Switch>
        </main>
      </div>
    )
  }
}

export default App
