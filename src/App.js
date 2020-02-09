// STYLES
import './App.css'

// DEPENDENCIES
import React, { Component, Fragment } from 'react'
import { Route, Switch, Redirect, withRouter } from 'react-router-dom'
import decode from 'jwt-decode'
import axios from 'axios'
import { search } from './utils';

// COMPONENTS
import Account from './components/Account/Account'
import AdminClassroom from './components/Admin/AdminClassroom'
import AdminCases from './components/Admin/AdminCases'
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
import ManageCase from './components/ManageCase/ManageCase'
import Note from './components/Note/Note'
import Order from './components/Order/Order'
import SideNav from './components/SideNav/SideNav'
import Signup from './components/Signup/Signup'
import Subject from './components/Subject/Subject'
import TopicInfo from './components/TopicInfo/TopicInfo'
import PageNotFound from './components/PageNotFound';

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
    cases: [],
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
    quizzes: [],
    searchBody: null,
    searchAttempted: false,
    signupError: null,
    sizeLimit: null,
    start: 0,
    userID: null,
    subjectLoaded: '',
    subjects: [],
    subjectSelected: '',
    topics: [],
    // url: "http://localhost:4000",
    url: "https://ble-backend.herokuapp.com",
    userCount: null,
    users: [] 
  }

  async componentDidMount() {
    try {
      console.log('APP MOUNTED')
      console.log(`Logged in: ${this.state.isLoggedIn}`)
      if (localStorage.token) {
        const [user, notes] = await Promise.all([
          await axios.get(`${this.state.url}/users/me`, authHeader),
          await axios.get(`${this.state.url}/notes`, authHeader)
        ])
        this.setState(() => ({
          isLoggedIn: true,
          userID: decode(localStorage.token),
          firstName: user.data.firstName,
          lastName: user.data.lastName,
          email: user.data.email,
          phoneNumber: user.data.phoneNumber,
          profession: user.data.profession,
          isSubscriber: user.data.isSubscriber,
          notes: [].concat(notes.data)
        }));
        this.pickSubjectData()
      } else {
        this.setState(() => ({
          isLoggedIn: false, // CODA: true for testing.
          userID: null
        }))
      }
    } catch (err) {
      console.log('ERROR:', err)
    }
  }

  getMyLists = async () => {
    const list = await axios.get(`${this.state.url}/lists`, authHeader);
    this.setState(() => ({ lists: [].concat(list.data) }));
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

  handleLoadQuizzes = async () => {
    try {
      this.setState(() => ({ quizzes: [] }))
      const quizzes = await axios.get(`${this.state.url}/quizzes`, authHeader)
      if (!quizzes.data.quizzes.length > 0) {
        console.log('No quizzes were found')
        return 'No quizzes were found'
      }
      this.setState((prevState) => ({ quizzes: prevState.quizzes.concat(quizzes.data.quizzes) }))
      console.log(quizzes.data.quizzes)
    } catch (err) {
      console.log(err)
    }
  }

  handleLoadTopics = async () => {
    try {
      this.setState(() => ({ topics: [] }))
      const topics = await axios.get(`${this.state.url}/topics`, authHeader)
      if (!topics.data.length > 0) {
        console.log('No topics were found')
        return 'No topics were found'
      }
      this.setState((prevState) => ({ topics: prevState.topics.concat(topics.data) }))
      console.log(topics.data)
    } catch (err) {
      console.log(err)
    }
  }

  handleAddQuiz = async (quiz) => {
    console.log(`Quiz to add: ${quiz.topic}`)
    if (!quiz) {
      return 'Enter a valid quiz question and answer'
    } else if (this.state.quizzes.filter(q => quiz.question === q.question).length) {
      console.log('DUPLICATE QUIZ QUESTION DETECTED')
      return 'This quiz already exists'
    }
    try {
      const newQuiz = await axios.post(`${this.state.url}/quizzes`, {
        question: quiz.question,
        answer: quiz.answer,
        explanation: quiz.explanation,
        topic: quiz.topic
      }, authHeader)
      this.setState((prevState) => ({
        quizzes: prevState.quizzes.concat(newQuiz.data)
      }))
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
      }, authHeader)
      this.setState((prevState) => ({
        subjects: prevState.subjects.concat(newSubject.data)
      }))

    } catch (err) {
      console.log(err)
    }
  }

  handleAddTopic = async (topicName) => {
    console.log(`Topic to add: ${topicName}`)
    if (!topicName) {
      return 'Enter a valid value to add topic'
    } else if (this.state.topics.filter(topic => topicName === topic.name).length) {
      console.log('DUPLICATE TOPIC DETECTED')
      return 'This topic already exists'
    }
    try {
      const newTopic = await axios.post(`${this.state.url}/topics`, {
        name: topicName
      }, authHeader)
      this.setState((prevState) => ({
        topics: prevState.topics.concat(newTopic.data)
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
      this.setState((prevState) => ({
          searchAttempted: true,
          esSearchResults: searchResult.data,
          batchedSearchResults: prevState.batchedSearchResults.concat(searchResult.data.slice(0, count))
      }));

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
    const pubLists = await axios.get(`${this.state.url}/lists/pub`, authHeader)
    this.setState(() => ({ lists: pubLists.data }))
  }

  onAddNote = async (e, note) => {
    e.preventDefault()
    try {
      await axios.post(`${this.state.url}/notes/${note.noteType}`, {
        title: note.noteTitle,
        body: note.noteBody
      }, authHeader)
      const notes = await axios.get(`${this.state.url}/notes`, authHeader)
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
  getCases = async (skip=0, limit=200) => {
    console.log("getCases()")
    try {
      const cases = await axios.get(`${this.state.url}/cases?skip=${skip}&limit=${limit}`, authHeader)
      console.log(cases.data.cases)
      this.setState(() => ({
        cases: [].concat(cases.data.cases),
        casesCount: cases.data.casesCount
      }))
    } catch (err) {
      console.log(err)
    }
  }
  getUsers = async (skip=0, limit=50) => {
    try {
      // this.setState(() => ({ cases: [] }))
      const users = await axios.get(`${this.state.url}/users?skip=${skip}&limit=${limit}`, authHeader)
      console.log(users.data.userCount, users.data.users)
      this.setState(() => ({
        users: [].concat(users.data.users),
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
                <div 
                style={{paddingLeft: this.state.isLoggedIn ? "250px" : "0"}} 
                className="content"
                >
                
                    {this.state.isLoggedIn && 
                      <SideNav
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        isLoggedIn={this.state.isLoggedIn}
                        onLogout={this.onLogout}
                        onAddNote={this.onAddNote}
                      />
                    }
                
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
 
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
     
                  <main>
                    <Account
                      {...props}
                      userID={this.state.userID}
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      phoneNumber={this.state.phoneNumber}
                      profession={this.state.profession}
                      lists={this.state.lists}
                      notes={this.state.notes}
                      isLoggedIn={this.state.isLoggedIn}
                      url={this.state.url}
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
 
                      <SideNav
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        isLoggedIn={this.state.isLoggedIn}
                        onLogout={this.onLogout}
                        onAddNote={this.onAddNote}
                      />
                
                    <main>
                      <LegalIndex
                        {...props}
                        esSearchResults={this.state.esSearchResults}
                        sizeLimit={this.state.sizeLimit}
                        batchedSearchResults={this.state.batchedSearchResults}
                        lists={this.state.lists}
                        notes={this.state.notes}
                        fetchPubLists={this.fetchPubLists}
                        onSearchSubmit={this.onSearchSubmit}
                        loadMoreResults={this.loadMoreResults}
                        searchAttempted={this.state.searchAttempted}
                        onFetchCase={this.onFetchCase}
                        onAddNote={this.onAddNote}
                        onLimitChange={this.onLimitChange}
                        getMyLists={this.getMyLists}
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

                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
             
                  <main>
                    <CaseDetail
                      {...props}
                      userID={this.state.userID}
                      lists={this.state.lists}
                      url={this.state.url}
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
       
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
       
                  <main>
                    <LinkedCase
                      {...props}
                      userID={this.state.userID}
                      lists={this.state.lists}
                      url={this.state.url}
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
 
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
               
                    <main>
                      <AdminClassroom
                        {...props}
                        {...this.state}
                        handleAddQuiz={this.handleAddQuiz}
                        handleAddSubject={this.handleAddSubject}
                        handleAddTopic={this.handleAddTopic}
                        handleLoadQuizzes={this.handleLoadQuizzes}
                        handleLoadSubjects={this.handleLoadSubjects}
                        handleLoadTopics={this.handleLoadTopics}
                      />
                    </main>
                </div>
              </Fragment>
            )}
          />  
          <Route
            exact
            path="/admin/cases"
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
           
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />

                    <main>
                      <AdminCases
                        {...props}
                        cases={this.state.cases}
                        getCases={this.getCases}
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
           
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
             
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
     
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />

                  <main>
                    <ManageUser
                      {...props}
                      url={this.state.url}
                      getUsers={this.getUsers}
                    />
                  </main>
                </div>
              </Fragment>
            )}
          />
          <Route 
            path="/admin/legal-index/cases/:_id/edit"
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
                
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />

                  <main>
                    <ManageCase
                      {...props}
                      url={this.state.url}
                      getCases={this.getCases}
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

                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
            
                  <main>
                    <List
                      {...props}
                      userID={this.state.userID}
                      url={this.state.url}
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
                  
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                    />
   
                  <main>
                    <Note
                      {...props}
                      url={this.state.url}
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
                 
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                      onAddNote={this.onAddNote}
                    />
           
                  
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
                 
                    <SideNav
                      firstName={this.state.firstName}
                      lastName={this.state.lastName}
                      email={this.state.email}
                      isLoggedIn={this.state.isLoggedIn}
                      onLogout={this.onLogout}
                      onAddNote={this.onAddNote}
                    />
          
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
                   
                      <SideNav
                        firstName={this.state.firstName}
                        lastName={this.state.lastName}
                        email={this.state.email}
                        isLoggedIn={this.state.isLoggedIn}
                        onLogout={this.onLogout}
                      />
                
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
              <Route component={PageNotFound} />

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