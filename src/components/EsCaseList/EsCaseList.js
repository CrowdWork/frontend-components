import './EsCaseList.css'
import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Preloader from '../Preloader/Preloader'

const EsCaseList = ({ batchedSearchResults, esSearchResults, onFetchCase, loadMoreResults }) => {
  const caseList = batchedSearchResults.map(thisCase => {
      console.log(thisCase._source.mongo_id)
      return (
        <li className="col s12 card-wrapper" key={thisCase._source.mongo_id}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div>
                  <h6 className="header"><strong>{thisCase._source.caseName.length > 40 ? (thisCase._source.caseName.substring(0, 40) + '...') : (thisCase._source.caseName)}</strong></h6>
                  <p>{thisCase._source.citation}</p>
                </div>
                <div className="court-year">
                  <p>{thisCase._source.court}</p>
                  <p>{thisCase._source.year}</p>
                </div>
              </div>
              <div className="card-action">
                <Link to={`/case/${thisCase._source.mongo_id}`} className="left">Detail</Link>
              </div>
            </div>
          </div>
        </li>
      )
    })
    console.log('Batched Results: ' + batchedSearchResults.length)
    console.log('Case List: ' + caseList.length)
  return (
    <div className="caselist-wrapper">
      
      <InfiniteScroll
        dataLength={batchedSearchResults.length}
        next={loadMoreResults}
        hasMore={caseList.length < esSearchResults.length}
        scrollThreshold={1}
        loader={<Preloader />}
        endMessage={
          <p style={{textAlign: 'center'}}>
            <b>Yay! You have seen it all</b>
          </p>
        }
      >
      <div className="list-utils center-align">
        <h6 className="result-header header center">Showing 1 - {caseList.length} of {esSearchResults.length} {caseList.length > 1 ? ('Cases') : ('Case')}</h6>
      </div>
      <ul>
        {caseList}
      </ul>
      </InfiniteScroll>
    </div>
  )
}

export default EsCaseList