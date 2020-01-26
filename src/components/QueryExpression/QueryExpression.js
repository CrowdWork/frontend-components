import React, { Fragment } from 'react'

const QueryRow = ({ fieldToSearch, logicalOperator, rowInput, searchCriterion, handleDeleteSubQuery }) => {

  return (
    <li>
      <p className="queryRow__text">
        {logicalOperator && <span>{logicalOperator}</span>} {fieldToSearch.toUpperCase()} {searchCriterion} <b>{rowInput}</b> 
        {/* <button href="#" className="secondary-content" onClick={(e) => handleDeleteSubQuery(e)}>
          <i className="material-icons">delete</i>
        </button> */}
      </p><br/>
    </li>
    
  )
}

export default QueryRow
