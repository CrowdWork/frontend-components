import './LegalIndex.css'
import React from 'react'
import Search from '../Search/Search'
import CaseList from '../CaseList/CaseList'

const LegalIndex = (props) => {

  const renderContent = () => {
    if (props.esSearchResults.length === 0) {
      return props.errorMessage ?
        (<div>Error: {props.errorMessage}</div>) :
        (<div>Try searching!</div>)
    }
    if (props.esSearchResults !== 0) {
      console.log('Batched Results: ' + props.batchedSearchResults.length)
      return props.errorMessage ?
        (<div>Search did not return a match. Please try again.</div>) :
        (<CaseList
          esSearchResults={props.esSearchResults}
          batchedSearchResults={props.batchedSearchResults}
          loadMoreResults={props.loadMoreResults}
        />)
    }

    return <div>Loading...</div>
  }

    return (
      <div className="legal-index-wrapper center">
        <h4 className="center">Legal Index</h4>
        <Search onSubmit={props.onSubmit} />
        {renderContent()}
      </div>
    )
}

export default LegalIndex
