import React from 'react'
import QueryExpression from '../QueryExpression/QueryExpression'

const QueryRows = ({ queryStringAggregator, queryArr, renderFieldOptions, renderQueryOperators }) => {

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
      />
    ))
    return rules
  };

  return (
    queryStringAggregator.length && (
    <ul>
      {renderQueryRows()}
    </ul>
    )
  )
}

export default QueryRows