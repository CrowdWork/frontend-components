import React from 'react'
import '../Admin/Admin.css'

const SubjectList = ({ subjects }) => {
  console.log(subjects)
  const subjectList = subjects.map(subject => {
    return (
      <tr key={subjects.indexOf(subject)}>
        <td>{subject.name}</td>
      </tr>
    )
  })
  return (
    <div className="SubjectList-container">
      <table>
        <thead>
          <tr>
            <th>Subjects</th>
          </tr>
        </thead>
        <tbody>
          {subjectList}
        </tbody>
      </table>
    </div>
  )
}

export default SubjectList;

