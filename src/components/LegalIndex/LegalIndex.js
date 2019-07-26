import './LegalIndex.css'
import React from 'react'
import Search from '../Search/Search'
import CaseList from '../CaseList/CaseList'

const LegalIndex = (props) => {
  
  const renderContent = () => {
    if (props.esSearchResults.length === 0 && !props.searchAttempted) {
      return props.errorMessage ?
        (<div>Error: {props.errorMessage}</div>) :
        (<div className="center">Try searching!</div>)
    }
    if (props.searchAttempted && !props.errorMessage) {
      return props.esSearchResults.length === 0 ?
        (<div>Search did not return a match. Please try again.</div>) :
        (<CaseList
          esSearchResults={props.esSearchResults}
          batchedSearchResults={props.batchedSearchResults}
          loadMoreResults={props.loadMoreResults}
        />)
    }
    if (props.errorMessage) {
      return <div>Error: {props.errorMessage}</div>
    }

    return <div>Loading...</div>
  }

    return (
      <div className="legal-index-wrapper container">
     
        <h3>Legal Index</h3>
        <div className="row">
          <div className="col s12">
            <Search onSubmit={props.onSubmit} />
          </div>
        </div>
        <div className="row">
          {renderContent()}
        </div>
        
      </div>
    )
}

export default LegalIndex
