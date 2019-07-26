import './App.css'
import M from 'materialize-css'
import React, { Component } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import Header from './components/Header/Header'
import SideNav from './components/SideNav/SideNav'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Home from './components/Home/Home'
import LegalIndex from './components/LegalIndex/LegalIndex'
import Admin from './components/Admin/Admin'
import CaseDetail from './components/CaseDetail/CaseDetail'


// const url = "http://localhost:4000"
const url = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

class App extends Component {
  state = {
    batchedSearchResults: [],
    count: 20,
    email: '',
    esSearchResults: [],
    errorMessage: '',
    favorites: [],
    firstName: '',
    isLoggedIn: false,
    lastName: '',
    loginError: null,
    password: '',
    searchBody: null,
    searchAttempted: false,
    signupError: null,
    start: 0,
    userID: null
  }

  async componentDidMount() {
    console.log('APP MOUNTED')
    
    if (localStorage.token) {
      this.setState({
        isLoggedIn: true,
        userID: decode(localStorage.token)
      })
      try {
        const user = await axios.get(`${url}/users/me`, authHeader)
        console.log(user.data.favorites)
        this.setState({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          favorites: user.data.favorites
        })
      } catch (err) {
        console.log('ERROR:', err)
      }
      
    } else {
      this.setState({
        isLoggedIn: false,
        userID: null
      })
    }
  }

  onSignupSumbit = async (userInfo) => {

    try {
      const newUser = await axios.post(`${url}/users`, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        password: userInfo.password
      })

      localStorage.token = newUser.data.token

      this.setState({
        firstName: newUser.data.user.firstName,
        lastName: newUser.data.user.lastName,
        email: newUser.data.user.email,
        isLoggedIn: true,
        userID: decode(localStorage.token)
      })

      this.props.history.push('/')
    } catch (err) {
        console.log(err)
        this.setState({
          signupError: err
        })
    } 
  }

  onLoginSubmit = async (credentials) => {
    try {
      const loginUser = await axios.post(`${url}/users/login`, {
        email: credentials.email,
        password: credentials.password
      })

      localStorage.token = loginUser.data.token

      this.setState({
        firstName: loginUser.data.user.firstName,
        lastName: loginUser.data.user.lastName,
        email: loginUser.data.user.email,
        isLoggedIn: true
      })
      
      this.props.history.push('/')
    } catch (err) {
      this.setState({
        loginError: err
      })
    }
  }

  onLogout = () => {
    this.setState({
      email: '',
      password: '',
      isLoggedIn: false,
      userID: null
    })

    localStorage.clear()
  }

  onSearchSubmit = async (searchBody) => {
    this.setState({
      batchedSearchResults: [],
      esSearchResults: [],
      start: 0
    })
    const { count } = this.state

    for (let searchTerm in searchBody) {
      if (!searchBody[searchTerm]) {
        searchBody[searchTerm] = ''
      }
    }

    this.setState({ searchBody })
    
    try {
      const searchResult = await axios.get(`${url}/cases/search?count=${count}&start=${this.state.start}&query=${JSON.stringify(searchBody)}`, authHeader)
      console.log(searchResult.data)
      this.setState({ 
        searchAttempted: true,
        esSearchResults: searchResult.data,
        batchedSearchResults: this.state.batchedSearchResults.concat(searchResult.data.slice(0, count))
      })
    } catch (err) {
        this.setState( {errorMessage: err.message })
    }
  }

  loadMoreResults = () => {
    console.log('Loading more results...')
    
    try {
      this.setState({
        start: this.state.start + this.state.count
      })
      this.setState({
        batchedSearchResults: this.state.batchedSearchResults.concat(this.state.esSearchResults.slice(this.state.start, (this.state.start + this.state.count)))
      })
      console.log(this.state.start)
    } catch (err) {
        console.log(`ERROR: ${err}`)
        this.setState( {errorMessage: err.message })
    }
  }

  onToggleFavorite = async (mongo_id) => {
    if (this.state.favorites.includes(mongo_id)) {
      try {
        console.log(`Trying to DELETE`)
        const updatedFavorites = await axios.delete(`${url}/${mongo_id}/favorite`, authHeader)
        const toastHTML = '<span>Case removed from your favorites!</span><button class="btn-flat toast-action">View Favorites</button>'
        M.toast({html: toastHTML})
        this.setState({
          favorites: updatedFavorites.data
        })
        console.log(this.state.favorites.includes(mongo_id))
        console.log(this.state.favorites)
      } catch (err) {
        console.log(err)
      }
      
    } else {
        try {
          console.log(`Trying to POST`)
          const updatedFavorites = await axios.get(`${url}/${mongo_id}/favorite`, authHeader)
          const toastHTML = '<span>Case added to your favorites!</span><button class="btn-flat toast-action">View Favorites</button>'
          M.toast({html: toastHTML})
          this.setState({
            favorites: updatedFavorites.data
          })
          console.log(this.state.favorites.includes(mongo_id))
          console.log(this.state.favorites)
        } catch (err) {
          console.log(err)
        }
      }
    }

  render() {
    return (
      <div className="App-container">
        <div id="header-row" className="row">
          <Header
            className="Header-container"
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            isLoggedIn={this.state.isLoggedIn}
            onLogout={this.onLogout}
          />
        </div>
        <div id="content-row" className="row">
          <div id="sideNav-col"className="col m0 l4 xl9">
            <SideNav
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              isLoggedIn={this.state.isLoggedIn}
              onLogout={this.onLogout}
            />
          </div>
            <div id="main-col" className="col m12 l8 xl3">
            <main>
              <Switch>
                <Route
                  exact path="/"
                  render={(props) => this.state.isLoggedIn ? (
                    <Home 
                      {...props}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      handleLogout={this.handleLogout}
                    />
                  ) : (
                    <Redirect to="/login" />
                  )
                  }
                />
                <Route path="/admin" 
                  render={(props) => (
                    <Admin
                      {...props}
                    />
                  )}
                />
                <Route path="/signup"
                  render={(props) => (
                    <Signup 
                      {...props} 
                      onSubmit={this.onSignupSumbit}
                    />
                  )}
                />
                <Route path="/login"
                  render={(props) => this.state.isLoggedIn ? (
                    <Redirect to="/" />
                  ) : (
                    <Login 
                      {...props}
                      onSubmit={this.onLoginSubmit}
                    />
                  )
                  }
                />
                <Route path="/legal-index"
                  render={(props) => (
                    <LegalIndex
                      {...props}
                      esSearchResults={this.state.esSearchResults}
                      batchedSearchResults={this.state.batchedSearchResults}
                      onSubmit={this.onSearchSubmit}
                      loadMoreResults={this.loadMoreResults}
                      searchAttempted={this.state.searchAttempted}
                    />
                  )}
                />
                <Route path="/:mongo_id"
                  render={(props) => (
                    <CaseDetail
                      {...props}
                      favorites={this.state.favorites}
                      onToggleFavorite={this.onToggleFavorite}
                    />
                  )} />
              </Switch>
            </main>
            </div>
            
        </div>
        
      </div>
    )
  }
}

export default withRouter(App)
