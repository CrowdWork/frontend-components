import React, { Component } from 'react'
import AddSubject from '../AddSubject/AddSubject'
import SubjectList from '../SubjectList/SubjectList'
import './Admin.css'

export default class AdminClassroom extends Component {

  componentDidMount() {
    this.props.handleLoadSubjects()
  }

  render() {
    return (
      <div>
        <h2>Manage Classroom</h2>
        <AddSubject handleAddSubject={this.props.handleAddSubject} />
        <SubjectList subjects={this.props.subjects} />
      </div>
    )
  }
}
