import './LegalIndex.css'
import React from 'react'
import Search from '../Search/Search'
import CaseList from '../CaseList/CaseList'

const LegalIndex = (props) => {

  const renderContent = () => {
    if (!props.searchResult) {
      return props.errorMessage ?
        (<div>Error: {props.errorMessage}</div>) :
        (<div>Try searching!</div>)
    }
    if (!props.errorMessage && props.searchResult) {
      return props.searchResult.length === 0 ?
        (<div>Search did not return a match. Please try again.</div>) :
        (<CaseList searchResult={props.searchResult} />)
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
