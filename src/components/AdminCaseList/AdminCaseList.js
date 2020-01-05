import React from 'react'
import { Link } from 'react-router-dom'
import '../../components/AdminCaseList/AdminCaseList.css'

const AdminCaseList = ({ cases }) => {
  const caseList = cases.map(courtCase => {
    return (
      <tr key={cases.indexOf(cases)}>
        <td>{courtCase.citation}</td>
        <td>{courtCase.caseName}</td>
        <td>{courtCase.court}</td>
        <td>{courtCase.documentType}</td>
        <td>{courtCase.year}</td>
        <td>
          <Link to={`/admin/legal-index/cases/${courtCase._id}/edit`}><span className="blue-text">Manage</span></Link>
        </td>
      </tr>
    )
  })
  return (
    <div className="AdminCaseList-container">
      <table className="responsive-table">
        <thead>
          <tr>
            <th>Citation</th>
            <th>Case Name</th>
            <th>Court</th>
            <th>Document Type</th>
            <th>Year</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {caseList}
        </tbody>
      </table>
    </div>
  )
}

export default AdminCaseList