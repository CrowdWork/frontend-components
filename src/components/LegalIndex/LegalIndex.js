import './LegalIndex.css'
import React from 'react'
import Search from '../Search/Search'
import EsCaseList from '../EsCaseList/EsCaseList'

const LegalIndex = (props) => {
  
  const renderContent = () => {
    if (props.esSearchResults.length === 0 && !props.searchAttempted) {
      return props.errorMessage ?
        (<div>Error: {props.errorMessage}</div>) :
        (<div className="center">Try searching!</div>)
    }
    if (props.searchAttempted && !props.errorMessage) {
      console.log(props.batchedSearchResults)
      return props.esSearchResults.length === 0 ?
        (<div>Search did not return a match. Please try again.</div>) :
        (<EsCaseList
          esSearchResults={props.esSearchResults}
          batchedSearchResults={props.batchedSearchResults}
          loadMoreResults={props.loadMoreResults}
          onFetchCase={props.onFetchCase}
        />)
    }
    if (props.errorMessage) {
      return <div>Error: {props.errorMessage}</div>
    }

    return <div>Loading...</div>
  }

    return (
      <div className="legal-index-wrapper container">
     
        <h3 className="center">Legal Index</h3>
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
