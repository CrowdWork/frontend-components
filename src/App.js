import React, { Component } from 'react'
import { Route, Switch, Redirect } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import Header from './components/Header/Header'
import FormContainer from './components/FormContainer'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Dashboard from './components/Dashboard/Dashboard'
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

  onLoginSubmit = async (credentials) => {
    try {
      const loginUser = await axios.post(`${env}/users/login`, {
        email: credentials.email,
        password: credentials.password
      })
        
      console.log(loginUser.data.user)
      localStorage.token = loginUser.data.token
      this.setState({
        firstName: loginUser.data.user.firstName,
        lastName: loginUser.data.user.lastName,
        isLoggedIn: true
      })
      console.log(this.state)
    } catch (err) {
      this.setState({
        loginError: err
      })
    }
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
          handleLogout={this.handleLogout}
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
            <Route exact path="/login"
              render={(props) => (
                <FormContainer>
                  <Login 
                    {...props}
                    handleInput={this.handleInput}
                    onSubmit={this.onLoginSubmit}
                  />
                </FormContainer>
              )}
            />
            <Route 
              exact path="/"
              render={(props) => !this.state.isLoggedIn 
              ? <Redirect to="/login" {...props}  />
              : <Dashboard 
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
