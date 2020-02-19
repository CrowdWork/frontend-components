import React from 'react'
import QueryExpression from '../QueryExpression/QueryExpression'
import './QueryExpressions.css';

const QueryRows = ({ queryStringAggregator, queryArr, renderFieldOptions, renderQueryOperators, handleDeleteSubQuery }) => {

  const renderQueryRows = () => {
    const rules = queryArr.map((q) => (
      <QueryExpression
        key={Math.floor(Math.random() * 1000)}
        fieldToSearch={q.fieldToSearch}
        rowInput={q.rowInput}
        logicalOperator={q.logicalOperator}
        searchCriterion={q.searchCriterion}
        renderFieldOptions={renderFieldOptions}
        renderQueryOperators={renderQueryOperators}
        handleDeleteSubQuery={handleDeleteSubQuery}
      />
    ))
    return rules
  };

  return (
    queryStringAggregator.length && (
    <ul className="queryrows__ul">
      {renderQueryRows()}
    </ul>
    )
  )
}

export default QueryRows