import './App.css'
import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import Header from './components/Header/Header'
import SideNav from './components/SideNav/SideNav'
import Signup from './components/Signup/Signup'
import Login from './components/Login/Login'
import Account from './components/Account/Account'
import LegalIndex from './components/LegalIndex/LegalIndex'
import Admin from './components/Admin/Admin'
import List from './components/List/List'
import ListCard from './components/ListCard/ListCard'
import CaseDetail from './components/CaseDetail/CaseDetail'
import Note from './components/Note/Note'
import Order from './components/Order/Order'
import Landing from './components/Landing/Landing'
import Classroom from './components/Classroom/Classroom'
import { async } from 'q'
import Subject from './components/Subject/Subject'
import TopicInfo from './components/TopicInfo/TopicInfo';

const subjects = {
  subs: {
    subjects: ['Civil Procedure', 'Ghana Legal Systems', 'Law of Interpretation', 'Crimnial Law', "Family Law", 'Constitutional Law', 'Evidence']
  }
}
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
    profession: '',
    searchBody: null,
    searchAttempted: false,
    signupError: null,
    sizeLimit: null,
    start: 0,
    subscribed: true,
    userID: null,
    subjectLoaded: '',
    subjectSelected: '',
    topic: '',
  }

  async componentDidMount() {
    this.pickSubjectData()
    console.log('APP MOUNTED')
    console.log(`Logged in: ${this.state.isLoggedIn}`)
    if (localStorage.token) {
      this.setState(() => {
        return {
          isLoggedIn: true,
          userID: decode(localStorage.token)
        }
      })
      try {
        const user = await axios.get(`${url}/users/me`, authHeader)
        this.returnMyLists()
        const notes = await axios.get(`${url}/notes`, authHeader)
        console.log(notes)
        this.setState(() => ({
            firstName: user.data.firstName,
            lastName: user.data.lastName,
            email: user.data.email,
            phoneNumber: user.data.phoneNumber,
            notes: notes.data
        }))
      } catch (err) {
        console.log('ERROR:', err)
      }
    } else {
      this.setState(() => {
        return {
          isLoggedIn: false, // Should be false, change to true for testing
          userID: null
        }
      })
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

  returnMyLists = async () => {
    const lists = await axios.get(`${url}/lists`, authHeader)
    this.setState(() => { 
      return {
        lists: lists.data
      }
    })
  }

  handleSignup = async (userInfo) => {
    try {
      const newUser = await axios.post(`${url}/users`, {
        firstName: userInfo.firstName,
        lastName: userInfo.lastName,
        email: userInfo.email,
        phoneNumber: userInfo.phoneNumber,
        password: userInfo.password
      })
      localStorage.token = newUser.data.token

      this.setState(() => ({
        firstName: newUser.data.user.firstName,
        lastName: newUser.data.user.lastName,
        email: newUser.data.user.email,
        profession: newUser.data.user.profession,
        isLoggedIn: true,
        userID: decode(localStorage.token)
      }))

      this.props.history.push('/')
    } catch (err) {
      console.log(err)
      this.setState(() => ({ signupError: err }))
    }
  }

  handleLogin = async (credentials) => {
    try {
      const loginUser = await axios.post(`${url}/users/login`, {
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

      this.props.history.push('/')
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
    this.props.history.push('/')
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
      const searchResult = await axios.get(`${url}/cases/search?count=${count}&start=${this.state.start}&query=${JSON.stringify(searchBody)}`, authHeader)
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
      await axios.post(`${url}/lists`, {
        title: listBody.listTitle,
        public: listBody.listPublic
      }, authHeader)

      const lists = await axios.get(`${url}/lists`, authHeader)
      this.setState(() => ({ lists: lists.data }))

    } catch (err) {
      console.log(err)
    }
  }

  deleteList = async (list_id) => {
    console.log('FIRE DELETE LIST')
    try {
      await axios.delete(`${url}/lists/delete/${list_id}`, authHeader)
      const lists = await axios.get(`${url}/lists`, authHeader)
      this.setState(() => ({ lists: lists.data }))

    } catch (err) {
      console.log(err)
    }
  }

  fetchPubLists = async () => {
    const pubLists = await axios.get(`${url}/lists/pub`)
    console.log(pubLists.data)
    this.setState(() => ({ lists: pubLists.data }))
  }

  onAddNote = async (e, note) => {
    console.log(note)
    e.preventDefault()
    try {
      await axios.post(`${url}/notes/${note.noteType}`, {
        title: note.noteTitle,
        body: note.noteBody
      }, authHeader)
      const notes = await axios.get(`${url}/notes`, authHeader)
      console.log(notes)
      this.setState(() => ({ notes: notes.data }))

    } catch (err) {
      console.log(err)
    }
  }

  deleteNote = async (note_id) => {
    console.log('FIRE DELETE LIST')
    try {
      await axios.delete(`${url}/notes/delete/${note_id}`, authHeader)
      const notes = await axios.get(`${url}/notes`, authHeader)
      this.setState(() => ({ notes: notes.data }))
    } catch (err) {
      console.log(err)
    }
  }

  onSubscribe = async () => {
    try {
      const orderSubmit = await axios.get(`${url}/orders`, authHeader)
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
        const caseToAdd = await axios.get(`${url}/cases/add/${caseId}/${this.state.lists[0]._id}`, authHeader)
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
        const caseToRemove = await axios.get(`${url}/cases/remove/${caseId}/${this.state.lists[0]._id}`, authHeader)
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
          <Route exact path="/"
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
                        onAddNote={this.onAddNote}
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
                      <Landing
                        {...props}
                      />
                    </main>
                    </div>
                </Fragment>
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
                <Redirect to="/" />
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
                <Redirect to="/" />
              )}
          />

          <Route
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

          <Route path="/admin"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/" />
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
                      <Admin
                        {...props}
                        {...this.state}
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
                  
          <Route path="/frankinsense"
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