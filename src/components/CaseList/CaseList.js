import React from 'react'
import './CaseList.css'

const CaseList = ({ searchResult }) => {
    const caseList = searchResult.map(each => {
      return (
        <tr key={each._id}>
          <td>{each._source.caseName}</td>
          <td>{each._source.citation}</td>
          <td>{each._source.court}</td>
          <td>{each._source.year}</td>
        </tr>
      )
    })

  return caseList.length ? (
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
  ) : (
    <p className="center">Seek and ye shall find!</p>
  )
}

export default CaseList
