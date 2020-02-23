import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Axios from 'axios'
import './Classroom.css'
// import ClassMenu from "../ClassroomMenu/ClassroomMenu"
// import { render } from 'react-dom'

class Classroom extends Component {
  state = {
    quizzes: [],
    subjects: []
  }

  componentDidMount() {
    this.props.fetchSubjectData()
    this.props.fetchQuizData()
  }

  render() {
    console.log(`QUIZZES: ${this.state.quizzes}`)
    const { subjectCache, subjectSelected, onAddNote } = this.props
    return (
      <div className="row" id='container'>
        {this.state.subjects.map(subject => (
          <div className="col s12 m4 offset-l1" >
            <div className="card z-depth-4Name hoverable">
              <Link onClick={() => subjectSelected(subject)} to={`classroom/${subject._id}`}>
                <div className="card-content">
                  <span className="card-title">{subject.name}</span>
                </div>
              </Link>
            </div>
          </div>
        ))
        }
      </div>
    )
  }
}

export default Classroom

