import React from 'react'

const QueryRow = ({ fieldToSearch, logicalOperator, rowInput, searchCriterion }) => {
  return (
    <tr>
      <td>{logicalOperator}</td>
      <td>{fieldToSearch.toLowerCase()}</td>
      <td>{searchCriterion}</td>
      <td>{rowInput}</td>
    </tr>
  )
}

export default QueryRow
