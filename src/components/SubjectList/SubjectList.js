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
    <div>
      <table>
        <thead>
          <tr>
            <th>Subject Name</th>
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

