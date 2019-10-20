import React from 'react'

const QueryRow = ({ fieldToSearch, logicalOperator, rowInput, searchCriterion }) => {
  return (
    <li> 
      {logicalOperator && <li>{logicalOperator}</li>}
      <li>{fieldToSearch.toUpperCase()}</li>
      <li>{searchCriterion}</li>
      <li>{rowInput}</li>
      <li><a href="#!" className="secondary-content"><i className="material-icons">delete</i></a></li>
    </li>
  )
}

export default QueryRow
