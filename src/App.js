import './App.css'
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
import List from './components/List/List'
import ListCard from './components/ListCard/ListCard'
import CaseDetail from './components/CaseDetail/CaseDetail'
import Note from './components/Note/Note'
import Order from './components/Order/Order'
import Classroom from './components/Classroom/Classroom'


// const url = "http://localhost:4000"
const url = "https://ble-backend.herokuapp.com"

const authHeader = {
  headers: {
    'Authorization': localStorage.token
  }
}

class App extends Component {
  state = {
    batchedSearchResults: [],
    count: 20,
    email: '',
    esSearchResults: [],
    errorMessage: '',
    firstName: '',
    isLoggedIn: false,
    lastName: '',
    lists: [],
    loginError: null,
    notes: [],
    orderToken: '',
    password: '',
    phoneNumber: '',
    searchBody: null,
    searchAttempted: false,
    signupError: null,
    start: 0,
    subscribed: true,
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
        this.returnMyLists()
        const notes = await axios.get(`${url}/notes`, authHeader)
        console.log(notes)
        this.setState({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phoneNumber: user.data.phoneNumber,
          notes: notes.data
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

  returnMyLists = async () => {
    const lists = await axios.get(`${url}/lists`, authHeader)
    this.setState({ lists: lists.data })
  }

  onSignupSumbit = async (userInfo) => {
    try {
      const newUser = await axios.post(`${url}/users`, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
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
        phoneNumber: loginUser.data.user.phoneNumber,
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
      phoneNumber: '',
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
      this.setState({ errorMessage: err.message })
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
      this.setState({ errorMessage: err.message })
    }
  }

  onAddList = async (listBody) => {
    try {
      await axios.post(`${url}/lists`, {
        title: listBody.listTitle,
        public: listBody.listPublic
      }, authHeader)
      const lists = await axios.get(`${url}/lists`, authHeader)
      this.setState({
        lists: lists.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  deleteList = async (list_id) => {
    console.log('FIRE DELETE LIST')
    try {
      await axios.delete(`${url}/lists/delete/${list_id}`, authHeader)
      const lists = await axios.get(`${url}/lists`, authHeader)
      this.setState({
        lists: lists.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  fetchPubLists = async () => {
    const pubLists = await axios.get(`${url}/lists/pub`)
    console.log(pubLists.data)
    this.setState({ lists: pubLists.data })
  }

  onAddNote = async (note) => {
    console.log(note)
    try {
      await axios.post(`${url}/notes`, {
        title: note.noteTitle,
        body: note.noteBody
      }, authHeader)
      const notes = await axios.get(`${url}/notes`, authHeader)
      console.log(notes)
      this.setState({
        notes: notes.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  deleteNote = async (note_id) => {
    console.log('FIRE DELETE LIST')
    try {
      await axios.delete(`${url}/notes/delete/${note_id}`, authHeader)
      const notes = await axios.get(`${url}/notes`, authHeader)
      this.setState({
        notes: notes.data
      })
    } catch (err) {
      console.log(err)
    }
  }

  onSubscribe = async () => {
    try {
      const orderSubmit = await axios.get(`${url}/orders`, authHeader)
      console.log(orderSubmit.data)
      this.setState({
        orderToken: orderSubmit.data.token
      })
      this.props.history.push("/checkout")
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div className="App-container">
        <div id="header-row" className="row">
          <Header
            firstName={this.state.firstName}
            lastName={this.state.lastName}
            email={this.state.email}
            isLoggedIn={this.state.isLoggedIn}
            onLogout={this.onLogout}
          />
        </div>
        <div id="content-row" className="row">
          <div id="sideNav-col" className="col m0 l4 xl9">
            <SideNav
              firstName={this.state.firstName}
              lastName={this.state.lastName}
              email={this.state.email}
              isLoggedIn={this.state.isLoggedIn}
              onLogout={this.onLogout}
              onAddNote={this.onAddNote}
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
                      userID={this.state.userID}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      phoneNumber={this.state.phoneNumber}
                      caseDetail={this.state.caseDetail}
                      lists={this.state.lists}
                      notes={this.state.notes}
                      isLoggedIn={this.state.isLoggedIn}
                      handleLogout={this.handleLogout}
                      returnMyLists={this.returnMyLists}
                      fetchPubLists={this.fetchPubLists}
                      onAddList={this.onAddList}
                      onAddNote={this.onAddNote}
                    />
                  ) : (
                      <Redirect to="/login" />
                    )
                  }
                />
                <Route exact path="/admin"
                  render={(props) => (
                    <Admin
                      {...props}
                      {...this.state}
                    />
                  )}
                />
                <Route exact path="/signup"
                  render={(props) => (
                    <Signup
                      {...props}
                      onSubmit={this.onSignupSumbit}
                    />
                  )}
                />
                <Route exact path="/login"
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
                <Route exact path="/legal-index"
                  render={(props) => (
                    <LegalIndex
                      {...props}
                      esSearchResults={this.state.esSearchResults}
                      batchedSearchResults={this.state.batchedSearchResults}
                      onSubmit={this.onSearchSubmit}
                      loadMoreResults={this.loadMoreResults}
                      searchAttempted={this.state.searchAttempted}
                      onFetchCase={this.onFetchCase}
                      onAddNote={this.onAddNote}
                    />
                  )}
                />
                <Route path="/list/:list_id"
                  render={(props) => (
                    <List
                      {...props}
                      userID={this.state.userID}
                      onAddNote={this.onAddNote}
                      onFetchCase={this.onFetchCase}
                      deleteList={this.deleteList}
                    />
                  )}
                />
                <Route path="/case/:mongo_id"
                  render={(props) => (
                    <CaseDetail
                      {...props}
                      userID={this.state.userID}
                      lists={this.state.lists}
                      onAddNote={this.onAddNote}
                    />
                  )} />
                <Route path="/notes/:_id"
                  render={(props) => (
                    <Note
                      {...props}
                      deleteNote={this.deleteNote}
                    />
                  )}
                />
                <Route path="/subscribe"
                  render={(props) => this.state.isLoggedIn ? (
                    <Order
                      {...props}
                      onSubmit={this.onSubscribe}
                    />
                  ) : (
                      <Redirect to="/" />
                    )}
                />
                <Route path="/checkout"
                  component={() => {
                    window.location.href = `https://sandbox.expresspaygh.com/api/checkout.php?token=${this.state.orderToken}`
                  }}
                />
                <Route path="/frankinsense"
                  render={(props) => <Classroom {...this.state} {...props} />} />
              </Switch>
            </main>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(App)
