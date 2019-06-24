import React from 'react'
import './CaseList.css'

const CaseList = ({ cases }) => {

  const caseList = cases.map(each => {
    return (
      <tr key={each._id}>
        <td>{each._source.caseName}</td>
        <td>{each._source.citation}</td>
        <td>{each._source.court}</td>
        <td>{each._source.year}</td>
      </tr>
    )
  })

  return (
      <table className="table bordered">
      <thead>
        <tr>
          <th>Case Name</th>
          <th>Citation</th>
          <th>Court</th>
          <th>Year</th>
        </tr>
      </thead>
      <tbody>
        {caseList}
      </tbody>
    </table>
  )
}

export default CaseList
