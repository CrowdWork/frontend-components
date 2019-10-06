import React from 'react'
import QueryRow from '../QueryRow/QueryRow'

const QueryRows = ({ queryStringAggregator, queryArr, renderFieldOptions, renderQueryOperators }) => {

  const renderQueryRows = () => {
    const rules = queryArr.map((q) => (
      <QueryRow
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
    <div className="row table-padding">
    {queryStringAggregator.length ? (
      <table className="col-12">
        <thead>
          <tr>
            <th>Operator</th>
            <th>Field Name</th>
            <th>Search Critrion</th>
            <th>Input</th>
          </tr>
        </thead>
        <tbody>
          {renderQueryRows()}
        </tbody>
      </table>
        ) : (null)}
    </div>
  )
}

export default QueryRows