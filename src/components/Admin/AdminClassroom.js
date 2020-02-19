import React, { Component } from 'react'
import AddQuiz from '../AddQuiz/AddQuiz'
import AddSubject from '../AddSubject/AddSubject'
import SubjectList from '../SubjectList/SubjectList'
import TopicList from '../TopicList/TopicList'
import AddTopic from '../AddTopic/AddTopic'
import QuizList from '../QuizList/QuizList'
import './Admin.css'


export default class AdminClassroom extends Component {

  componentDidMount() {
    this.props.handleLoadQuizzes()
    this.props.handleLoadSubjects()
    this.props.handleLoadTopics()
    
  }

  render() {
    return (
      <div className="AdminClassroom-container">
        <h2>Manage Classroom</h2>
        <AddSubject handleAddSubject={this.props.handleAddSubject} />
        <SubjectList subjects={this.props.subjects} />
        <AddTopic handleAddTopic={this.props.handleAddTopic} />
        <TopicList topics={this.props.topics} />
        <AddQuiz
          topics={this.props.topics}
          handleAddQuiz={this.props.handleAddQuiz}
        />
        <QuizList quizzes={this.props.quizzes} />
      </div>
    )
  }
}
