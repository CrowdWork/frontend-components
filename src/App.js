import './App.css'
import M from 'materialize-css'
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
const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

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


  // adding a function that loads all subjects for the Frankisense classroom

  pickSubjectData = () => {
    try {
      this.setState({ subjectLoaded: subjects })
    } catch (error) {
      console.log('ERROR', error)
    }
  }
  // adding a function that picks a specific subject
  subjectSelection = (value) => {
    try {
      this.setState({ subjectSelected: value })

    } catch (error) {
      console.log('ERROR', error)
    }
  }

  topicSelection = (value) => {
    try {
      this.setState({ topic: value })
    } catch (error) {
      console.log("error", error)
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
        profession: newUser.data.user.profession,
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
        profession: loginUser.data.user.profession,
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
      phoneNumber: '',
      profession: '',
      isLoggedIn: false,
      userID: null
    })

    localStorage.clear()
    this.props.history.push('/')
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
        <Switch>
          <Route exact path="/"
            render={(props) => this.state.isLoggedIn ? (
              <Fragment>
                <div id="header-row" className="row">
                  <Header
                    title="ACCOUNT"
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </div>
                <div id="content-row" className="row">
                  <aside id="sideNav-col" className="col s0 l3 xl2">
                    <SideNav
                      {...props}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                      onAddNote={this.onAddNote}
                    />
                  </aside>
                  <div id="main-col" className="col s12 l9 xl10">
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
                        returnMyLists={this.returnMyLists}
                        fetchPubLists={this.fetchPubLists}
                        onAddList={this.onAddList}
                        onAddNote={this.onAddNote}
                      />
                    </main>
                  </div>

                </div>
              </Fragment>
            ) : (
                <Fragment>
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
                    <div id="main-col" className="col s12">
                      <main>
                        <Landing
                          {...props}
                        />
                      </main>
                    </div>
                  </div>
                </Fragment>
              )}
          />
          <Route path="/signup"
            render={(props) => !this.state.isLoggedIn ? (
              <Fragment>
                <div id="header-row" className="row">
                  <Header
                    title="BARNOR LAW ENGINE"
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </div>
                <div id="content-row" className="row">
                  <div id="main-col" className="col s12">
                    <main >
                      <Signup
                        {...props}
                        onSubmit={this.onSignupSumbit}
                      />
                    </main>
                  </div>
                </div>
              </Fragment>
            ) : (
                <Redirect to="/" />
              )}
          />
          <Route path="/login"
            render={(props) => !this.state.isLoggedIn ? (
              <Fragment>
                <div id="header-row" className="row">
                  <Header
                    title="WELCOME BACK"
                    firstName={this.state.firstName}
                    lastName={this.state.lastName}
                    email={this.state.email}
                    isLoggedIn={this.state.isLoggedIn}
                    onLogout={this.onLogout}
                  />
                </div>
                <div id="content-row" className="row">
                  <div id="main-col" className="col s12">
                    <main>
                      <Login
                        {...props}
                        onSubmit={this.onLoginSubmit}
                      />
                    </main>
                  </div>
                </div>
              </Fragment>
            ) : (
                <Redirect to="/" />
              )}
          />
          <Route path="/legal-index"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                  <div id="header-row" className="row">
                    <Header
                      title="LEGAL INDEX"
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </div>
                  <div id="content-row" className="row">
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
                    <div id="main-col" className="col s12 l9 xl10">
                      <main>
                        <LegalIndex
                          {...props}
                          esSearchResults={this.state.esSearchResults}
                          batchedSearchResults={this.state.batchedSearchResults}
                          fetchPubLists={this.fetchPubLists}
                          onSubmit={this.onSearchSubmit}
                          lists={this.state.lists}
                          loadMoreResults={this.loadMoreResults}
                          searchAttempted={this.state.searchAttempted}
                          onFetchCase={this.onFetchCase}
                          onAddNote={this.onAddNote}
                          returnMyLists={this.returnMyLists}
                        />
                      </main>
                    </div>
                  </div>
                </Fragment>
              )}
          />
          <Route path="/admin"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/admin" />
            ) : (
                <Fragment>
                  <div id="header-row" className="row">
                    <Header
                      title="ADMIN CONSOLE"
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </div>
                  <div id="content-row" className="row">
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
                    <div id="main-col" className="col s12 l9 xl10">
                      <main>
                        <Admin
                          {...props}
                          {...this.state}
                        />
                      </main>
                    </div>
                  </div>
                </Fragment>

              )}
          />
          <Route path="/frankinsense"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                  <div id="header-row" className="row">
                    <Header
                      title="FRANKINSENSE CLASSROOM"
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </div>
                  <div id="content-row" className="row">
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
                    <div id="main-col" className="col s12 l9 xl10">
                      <main>
                        <Classroom
                          subjectCache={this.state.subjectLoaded}
                          subjectSelected={this.subjectSelection}
                        />
                      </main>
                    </div>
                  </div>
                </Fragment>
              )} />

          <Route path="/classroom/:subject"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                  <div id="header-row" className="row">
                    <Header
                      title={`TOPICS - ${this.state.subjectSelected.toUpperCase()}`}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </div>
                  <div id="content-row" className="row">
                    <aside id="sideNav-col" className="col s0 l3 xl2">
                      <SideNav
                        subject={this.state.subjectSelected}
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        isLoggedIn={this.state.isLoggedIn}
                        onLogout={this.onLogout}
                        onAddNote={this.onAddNote}
                      />
                    </aside>
                    <div id="main-col" className="col s12 l9 xl10">
                      <main>
                        <Subject
                          topicSelected={this.topicSelection}

                        />
                      </main>
                    </div>
                  </div>
                </Fragment>
              )} />

          <Route path="/subject/:topic"
            render={(props) => !this.state.isLoggedIn ? (
              <Redirect to="/login" />
            ) : (
                <Fragment>
                  <div id="header-row" className="row">
                    <Header
                      title={this.state.topic.toUpperCase()}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
                  </div>
                  <div id="content-row" className="row">
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
                    <div id="main-col" className="col s12 l9 xl10">
                      <main>
                        <TopicInfo />
                      </main>
                    </div>
                  </div>
                </Fragment>
              )} />
        </Switch>

        {/* <div id="content-row" className="row">
          
                <Route exact path="/admin" 
                  render={(props) => this.state.isLoggedIn ? (
                    <Admin
                      {...props}
                      {...this.state}
                    />
                  ) : (
                    <Redirect to="/login" />
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
              
                <Route exact path="/legal-index"
                  render={(props) => this.state.isLoggedIn ? (
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
                  ) : (
                    <Redirect to="/login" />
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
        </div>*/}
      </div>
    )
  }
}

export default withRouter(App)
