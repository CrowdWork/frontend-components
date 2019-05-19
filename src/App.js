import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import Header from './components/Header/Header'
import FormContainer from './components/FormContainer'
import FormSignup from './components/FormSignup/FormSignup'
import FormLogin from './components/FormLogin/FormLogin'
import AdminConsole from './components/AdminConsole/AdminConsole'
import './App.css'

const env = "http://localhost:4000"

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

  

  // Handle input for form
  handleInput = input => e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  }

  // handle signup
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
        console.log(res)
        localStorage.token = res.data.token
        this.setState({
          firstName: res.user.firstName,
          lastName: res.user.lastName,
          isLoggedIn: true
        });
      })
      .catch(err => this.setState({
        loginError: err.res
      }))
  }

  // logout function
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
            <Route exact path="/signup"
              render={(props) => (
                <FormContainer>
                  <FormSignup {...props} handleInput={this.handleInput} handleSignup={this.handleSignup}/>
                </FormContainer>
              )}
            />
            <Route exact path="/"
              render={(props) => (
                <FormContainer>
                  <FormLogin {...props} handleInput={this.handleInput} handleLogin={this.handleLogin}/>
                </FormContainer>
              )}
            />
            <Route path="/admin"
              render={(props) => (
                <AdminConsole
                  {...this.state}
                  {...props}
                  isLoggedIn={this.state.isLoggedIn}
                  handleLogout={this.handleLogout}
                />
              )}
            />
          </Switch>
          
        </main>
        
      </div>
    )
  }
}

export default App
