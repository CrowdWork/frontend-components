// STYLES
import './App.css'

// DEPENDENCIES
import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'

// COMPONENTS
import Account from './components/Account/Account'
import AdminClassroom from './components/Admin/AdminClassroom'
import AdminLegalIndex from './components/Admin/AdminLegalIndex'
import AdminUsers from './components/Admin/AdminUsers'
import CaseDetail from './components/CaseDetail/CaseDetail'
import Classroom from './components/Classroom/Classroom'
import Header from './components/Header/Header'
import Landing from './components/Landing/Landing'
import LegalIndex from './components/LegalIndex/LegalIndex'
import LinkedCase from './components/CaseDetail/LinkedCase'
import List from './components/List/List'
import Login from './components/Login/Login'
import ManageUser from './components/ManageUser/ManageUser'
import Note from './components/Note/Note'
import Order from './components/Order/Order'
import SideNav from './components/SideNav/SideNav'
import Signup from './components/Signup/Signup'
import Subject from './components/Subject/Subject'
import TopicInfo from './components/TopicInfo/TopicInfo'

const subjects = {
  subs: {
    subjects: ['Civil Procedure', 'Ghana Legal Systems', 'Law of Interpretation', 'Crimnial Law', "Family Law", 'Constitutional Law', 'Evidence']
  }
}

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
    fetchedCase: '',
    isLoggedIn: false, // CODA: true for testing
    isSubscriber: false,
    lastName: '',
    lists: [],
    loginError: null,
    notes: [],
    orderToken: '',
    password: '',
    phoneNumber: '',
    profession: '',
    searchBody: null,
    searchAttempted: false,
    signupError: null,
    sizeLimit: null,
    start: 0,
    subscribed: false, // CODA: false for testing
    userID: null,
    subjectLoaded: '',
    subjects: [],
    subjectSelected: '',
    topic: '',
    url: "http://localhost:4000",
    // url: "https://ble-backend.herokuapp.com",
    userCount: null,
    users: []
  }

  async componentDidMount() {
    this.pickSubjectData()
    console.log('APP MOUNTED')
    console.log(`Logged in: ${this.state.isLoggedIn}`)
    if (localStorage.token) {
      this.setState(() => ({
        isLoggedIn: true,
        userID: decode(localStorage.token)
      }))
      try {
        const user = await axios.get(`${this.state.url}/users/me`, authHeader)
        const lists = await axios.get(`${this.state.url}/lists`, authHeader)
        const notes = await axios.get(`${this.state.url}/notes`, authHeader)
        console.log(notes.data)
        console.log(lists.data)
        this.setState((prevState) => ({
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phoneNumber: user.data.phoneNumber,
          profession: user.data.profession,
          isSubscriber: user.data.isSubscriber,
          lists: prevState.lists.concat(lists.data),
          notes: prevState.notes.concat(notes.data)
        }))
      } catch (err) {
        console.log('ERROR:', err)
      }
    } else {
      this.setState(() => ({
        isLoggedIn: false, // CODA: true for testing.
        userID: null
      }))
    }
  }

  handleLoadSubjects = async () => {
  
    try {
      this.setState(() => ({ subjects: [] }))
      const subjects = await axios.get(`${this.state.url}/subjects`, authHeader)
      if (!subjects.data.length > 0) {
        console.log('No subjects were found')
        return 'No subjects were found'
      }
      this.setState((prevState) => ({ subjects: prevState.subjects.concat(subjects.data) }))
      
      console.log(subjects.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleAddSubject = async (subjectName) => {
    console.log(`Subject to add: ${subjectName}`)
    if (!subjectName) {
      return 'Enter valid value to add subject'
    } else if (this.state.subjects.filter(subject => subjectName === subject.name).length) {
      console.log('DUPLICATE SUBJECT DETECTED')
      return 'This subject already exists'
    }
    try {
      const newSubject = await axios.post(`${this.state.url}/subjects`, {
        name: subjectName
      })
      this.setState((prevState) => ({
        subjects: prevState.subjects.concat(newSubject.data)
      }))

    } catch (err) {
      console.log(err)
    }
  }

  // adding a function that loads all subjects for the Frankisense classroom

  pickSubjectData = () => {
    try {
      this.setState(() => {
        return {
          subjectLoaded: subjects
        }
      })
    } catch (error) {
      console.log('ERROR', error)
    }
  }
  // adding a function that picks a specific subject
  subjectSelection = (value) => {
    try {
      this.setState(() => { 
        return {
          subjectSelected: value
        }
      })

    } catch (error) {
      console.log('ERROR', error)
    }
  }

  selectTopic = (value) => {
    try {
      this.setState(() => { 
        return {
          topic: value
        }
      })
    } catch (error) {
      console.log("error", error)
    }
  }

  handleSignup = async (userInfo) => {
    try {
      const newUser = await axios.post(`${this.state.url}/users`, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        password: userInfo.password,
        profession: userInfo.profession,
        nameOfChambers: userInfo.nameOfChambers,
        addressOfChambers: userInfo.addressOfChambers
      })
      localStorage.token = newUser.data.token

      this.setState(() => ({
        firstName: newUser.data.user.firstName,
        lastName: newUser.data.user.lastName,
        email: newUser.data.user.email,
        phoneNumber: newUser.data.user.phoneNumber,
        profession: newUser.data.user.profession,
        nameOfChambers: newUser.data.user.nameOfChamber,
        addressOfChambers: newUser.data.user.addressOfChambers,
        isLoggedIn: true,
        userID: decode(localStorage.token)
      }))

      this.props.history.push('/account')
    } catch (err) {
      console.log(err)
      this.setState(() => ({ signupError: err }))
    }
  }

  handleLogin = async (credentials) => {
    try {
      const loginUser = await axios.post(`${this.state.url}/users/login`, {
        email: credentials.email,
        password: credentials.password
      })
      localStorage.token = loginUser.data.token
      this.setState(() => ({
        firstName: loginUser.data.user.firstName,
        lastName: loginUser.data.user.lastName,
        email: loginUser.data.user.email,
        phoneNumber: loginUser.data.user.phoneNumber,
        profession: loginUser.data.user.profession,
        isLoggedIn: true
      }))
      
      this.props.history.push('/account')
    } catch (err) {
      this.setState(() => ({ loginError: err }))
    }
  }

  onLogout = () => {
    this.setState(() => ({
      email: '',
      password: '',
      phoneNumber: '',
      phoneNumber: '',
      profession: '',
      isLoggedIn: false, //Change Me
      userID: null
    }))

    localStorage.clear()
    this.props.history.push('/login')
  }

  onLimitChange = (sizeLimit) => {
    this.setState(() => ({ sizeLimit }))
  }

  onSearchSubmit = async (searchBody) => {
    console.log(searchBody)

    this.setState(() => ({
      batchedSearchResults: [],
      esSearchResults: [],
      start: 0,
      sizeLimit: null
    }))
    const { count } = this.state
    for (let searchTerm in searchBody) {
      if (!searchBody[searchTerm]) searchBody[searchTerm] = ''
    }
    this.setState(() => ({ searchBody }))
    try {
      const searchResult = await axios.get(`${this.state.url}/cases/search?count=${count}&start=${this.state.start}&query=${JSON.stringify(searchBody)}`, authHeader)
      console.log(searchResult.data)
      this.setState((prevState) => ({
          searchAttempted: true,
          esSearchResults: searchResult.data,
          batchedSearchResults: prevState.batchedSearchResults.concat(searchResult.data.slice(0, count))
      }))

    } catch (err) {
      this.setState(() => ({ errorMessage: err.message }))
    }
  }

  loadMoreResults = () => {
    console.log('Loading more results...')
    try {
      this.setState((prevState) => ({ start: prevState.start + this.state.count }))
      this.setState((prevState) => ({
        batchedSearchResults: prevState.batchedSearchResults.concat(this.state.esSearchResults.slice(this.state.start, (this.state.start + this.state.count)))
      }))
      console.log(this.state.start)

    } catch (err) {
      console.log(`ERROR: ${err}`)
      this.setState(() => ({ errorMessage: err.message }))
    }
  }

  onAddList = async (e, listBody) => {
    e.preventDefault()
    try {
      await axios.post(`${this.state.url}/lists`, {
        title: listBody.listTitle,
        public: listBody.listPublic
      }, authHeader)

      const lists = await axios.get(`${this.state.url}/lists`, authHeader)
      this.setState(() => ({ lists: lists.data }))

    } catch (err) {
      console.log(err)
    }
  }

  deleteList = async (list_id) => {
    console.log('FIRE DELETE LIST')
    try {
      await axios.delete(`${this.state.url}/lists/delete/${list_id}`, authHeader)
      const lists = await axios.get(`${this.state.url}/lists`, authHeader)
      this.setState(() => ({ lists: lists.data }))

    } catch (err) {
      console.log(err)
    }
  }

  fetchPubLists = async () => {
    const pubLists = await axios.get(`${this.state.url}/lists/pub`)
    console.log(pubLists.data)
    this.setState(() => ({ lists: pubLists.data }))
  }

  onAddNote = async (e, note) => {
    console.log(note)
    e.preventDefault()
    try {
      await axios.post(`${this.state.url}/notes/${note.noteType}`, {
        title: note.noteTitle,
        body: note.noteBody
      }, authHeader)
      const notes = await axios.get(`${this.state.url}/notes`, authHeader)
      console.log(notes)
      this.setState(() => ({ notes: notes.data }))

    } catch (err) {
      console.log(err)
    }
  }

  deleteNote = async (note_id) => {
    console.log('FIRE DELETE LIST')
    try {
      await axios.delete(`${this.state.url}/notes/delete/${note_id}`, authHeader)
      const notes = await axios.get(`${this.state.url}/notes`, authHeader)
      this.setState(() => ({ notes: notes.data }))
    } catch (err) {
      console.log(err)
    }
  }
  // getUser = async (_id) => {
  //   try {
  //     const user = await axios.get(`${this.state.url}/api/admin/users/${_id}`, authHeader)
  //     this.setState(() => ({ adminFetchedUser: user.data }))
  //   } catch (err) {
  //     console.log(err)
  //   }
  // }
  getUsers = async (skip=0, limit=10) => {
    try {
      this.setState(() => ({ users: [] }))
      const users = await axios.get(`${this.state.url}/users?skip=${skip}&limit=${limit}`, authHeader)
      console.log(users.data.users)
      this.setState((prevState) => ({
        users: prevState.users.concat(users.data.users),
        userCount: users.data.userCount
      }))
    } catch (err) {
      console.log(err)
    }
  }

  onSubscribe = async () => {
    try {
      const orderSubmit = await axios.get(`${this.state.url}/orders`, authHeader)
      console.log(orderSubmit.data)
      this.setState(() => ({ orderToken: orderSubmit.data.token }))
      this.props.history.push("/checkout")
    } catch (err) {
      console.log(err)
    }
  }

  toggleFavorite = async (caseId) => {
    console.log(caseId)
    if (!this.state.lists[0].cases.includes(caseId)) {
      console.log('Adding to Favorites')
      try {
        const caseToAdd = await axios.get(`${this.state.url}/cases/add/${caseId}/${this.state.lists[0]._id}`, authHeader)
        console.log(caseToAdd.data)
        let arr = []
        const result = caseToAdd.data
        this.setState(() => ({
          lists: arr.concat(result)
        }))
      } catch (err) {
        console.log(err)
      }
    } else {
      console.log('Removing from Favorites')
      try {
        const caseToRemove = await axios.get(`${this.state.url}/cases/remove/${caseId}/${this.state.lists[0]._id}`, authHeader)
        console.log(caseToRemove.data)
        let arr = []
        const result = caseToRemove.data
        this.setState(() => ({
          lists: arr.concat(result)
        }))
      } catch (err) {
        console.log(err)
      }
    }
  }

  render() {
    console.log('AM I LOGGED IN ? ' + this.state.isLoggedIn)
    return (
      <div className="App-container">
        <Switch>
          <Route
            exact
            path="/"
            render={(props) => (
              <Fragment>
                <header>
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                      onAddNote={this.onAddNote}
                    />
                  </aside>
                  <main>
                    <Landing
                      isLoggedIn={this.state.isLoggedIn}
                      {...props}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />
          <Route 
            path="/account"
            render={(props) => this.state.isLoggedIn ? (
              <Fragment>
                <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                  <main>
                    <Account
                      {...props}
                      userID={this.state.userID}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      phoneNumber={this.state.phoneNumber}
                      profession={this.state.profession}
                      caseDetail={this.state.caseDetail}
                      lists={this.state.lists}
                      notes={this.state.notes}
                      isLoggedIn={this.state.isLoggedIn}
                      handleLogout={this.handleLogout}
                    />
                  </main>
                </div>
              </Fragment>
            ) : (
                <Redirect to="/login" />
              )}
          />

          <Route path="/signup"
            render={(props) => !this.state.isLoggedIn ? (
              <Fragment>
                <header>
                    <Header
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </header>
                <div>
                  <main>
                    <Signup
                      {...props}
                      handleSignup={this.handleSignup}
                    />
                  </main>
                </div>
              </Fragment>
            ) : (
                <Redirect to="/account" />
              )}
          />
          <Route path="/login"
            render={(props) => !this.state.isLoggedIn ? (
              <Fragment>
                <header>
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div>
                    <main>
                      <Login
                        {...props}
                        handleLogin={this.handleLogin}
                      />
                    </main>
                </div>
              </Fragment>
            ) : (
                <Redirect to="/account" />
              )}
          />

          <Route
            exact
            path="/legal-index"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                  <div className="content">
                    <aside id="sideNav-col" className="col s0 l3 xl2">
                      <SideNav
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        isLoggedIn={this.state.isLoggedIn}
                        onLogout={this.onLogout}
                        onAddNote={this.onAddNote}
                      />
                    </aside>
                    <main>
                      <LegalIndex
                        {...props}
                        esSearchResults={this.state.esSearchResults}
                        sizeLimit={this.state.sizeLimit}
                        batchedSearchResults={this.state.batchedSearchResults}
                        fetchPubLists={this.fetchPubLists}
                        onSearchSubmit={this.onSearchSubmit}
                        lists={this.state.lists}
                        notes={this.state.notes}
                        loadMoreResults={this.loadMoreResults}
                        searchAttempted={this.state.searchAttempted}
                        onFetchCase={this.onFetchCase}
                        onAddNote={this.onAddNote}
                        onLimitChange={this.onLimitChange}
                        returnMyLists={this.returnMyLists}
                        fetchPubLists={this.fetchPubLists}
                        onAddList={this.onAddList}
                      />
                    </main>
                  </div>
                </Fragment>
              )}
          />

          <Route path="/case/:mongo_id"
            render={(props) => (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col"className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                  <main>
                    <CaseDetail
                      {...props}
                      userID={this.state.userID}
                      lists={this.state.lists}
                      onAddNote={this.onAddNote}
                      toggleFavorite={this.toggleFavorite}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />

          <Route path="/linkedcase/:citation"
            render={(props) => (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col"className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                  <main>
                    <LinkedCase
                      {...props}
                      userID={this.state.userID}
                      lists={this.state.lists}
                      onAddNote={this.onAddNote}
                      toggleFavorite={this.toggleFavorite}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />
          <Route
            exact
            path="/admin/classroom"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                    <main>
                      <AdminClassroom
                        {...props}
                        {...this.state}
                        handleAddSubject={this.handleAddSubject}
                        handleLoadSubjects={this.handleLoadSubjects}
                      />
                    </main>
                </div>
              </Fragment>
            )}
          />  
          <Route
            exact
            path="/admin/legal-index"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                    <main>
                      <AdminLegalIndex
                        {...props}
                        {...this.state}
                      />
                    </main>
                </div>
              </Fragment>
            )}
          />
          <Route
            exact
            path="/admin/users"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                    <main>
                      <AdminUsers
                        {...props}
                        users={this.state.users}
                        getUsers={this.getUsers}
                      />
                    </main>
                </div>
              </Fragment>
            )}
          />
          <Route 
            path="/admin/users/:_id/edit"
            render={(props) => (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col"className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                  <main>
                    <ManageUser
                      {...props}
                      url={this.state.url}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />

          <Route path="/list/:list_id"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col"className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                  <main>
                    <List
                      {...props}
                      userID={this.state.userID}
                      onAddNote={this.onAddNote}
                      onFetchCase={this.onFetchCase}
                      deleteList={this.deleteList}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />
          <Route path="/notes/:_id"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col"className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </aside>
                  <main>
                    <Note
                      {...props}
                      deleteNote={this.deleteNote}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />   
          <Route path="/frankinsense"
            render={(props) => !this.state.isLoggedIn ? 
            (
              <Redirect to="/login" />
            ) : !this.state.isSubscriber ?
            (
              <Redirect to="/subscribe" />
            ) :
            (
              <Fragment>
              <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                <div className="content">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                      onAddNote={this.onAddNote}
                    />
                    </aside>
                  
                    <main>
                      <Classroom
                        subjectCache={this.state.subjectLoaded}
                        subjectSelected={this.subjectSelection}
                      />
                    </main>
                </div>
              </Fragment>
            )} 
          />

          <Route path="/classroom/:subject"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                  <div className="content">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                      onAddNote={this.onAddNote}
                    />
                    </aside>
                      <main>
                        <Subject
                          selectTopic={this.selectTopic}
                          {...this.state}
                        />
                      </main>
                  </div>
                </Fragment>
              )} />

          <Route path="/subject/:topic"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                <header className="header">
                  <Header
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </header>
                  <div className="content">
                    <aside id="sideNav-col" className="col s0 l3 xl2">
                      <SideNav
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        isLoggedIn={this.state.isLoggedIn}
                        onLogout={this.onLogout}
                      />
                    </aside>
                    <main>
                      <TopicInfo
                        selectTopic={this.selectTopic}
                        {...this.state}
                        onAddNote={this.onAddNote}
                      />
                      </main>
                  </div>
                </Fragment>
              )} />
              <Route path="/subscribe"
                render={(props) => !this.state.isLoggedIn ? (
                  <Redirect to="/login" />
                ) : (
                  <Order
                    {...props}
                    onSubmit={this.onSubscribe}
                  />
                )}
              />
              <Route path="/checkout"
                component={() => {
                  window.location.href = `https://sandbox.expresspaygh.com/api/checkout.php?token=${this.state.orderToken}`
                }}
              />

        </Switch>

        {/* <div className="content">
                
          <Route path="/notes/:_id"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
              <Fragment>
                <div id="header-row" className="row">
                  <Header
                    title="NOTE DETAIL"
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </div>
                <div id="content-row" className="row">
                  <aside id="sideNav-col"className="col s0 l3 xl2">
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
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
                  </aside>
                  <div id="main-col" className="col s12 l9 xl10">
                    <main>
                      <Note
                        {...props}
                        deleteNote={this.deleteNote}
                      />
                    </main>
                  </div>
                </div>
              </Fragment>
            )}
          />
          
        {/* <div id="content-row" className="row">
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
                
              </Switch>
            </main>
            </div>
        </div>*/}
      </div>
    )
  }
}

export default withRouter(App)