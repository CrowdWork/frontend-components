import './EsCaseList.css'
import React from 'react'
import { Link } from 'react-router-dom'
import InfiniteScroll from 'react-infinite-scroll-component'
import Preloader from '../Preloader/Preloader'

const EsCaseList = ({ batchedSearchResults, esSearchResults, loadMoreResults }) => {
  const caseList = batchedSearchResults.map(thisCase => {
      console.log(thisCase._source.mongo_id)
      return (
        <li className="col s12 card-wrapper" key={thisCase._source.mongo_id}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div>
                  <h6 className="header"><strong>{thisCase._source.caseName.length > 40 ? (thisCase._source.caseName.substring(0, 40) + '...') : (thisCase._source.caseName)}</strong></h6>
                  <span>{thisCase._source.citation}</span>
                </div>
                <div className="court-year">
                  <p>{thisCase._source.court}</p>
                  <p>{thisCase._source.year}</p>
                </div>
              </div>
              <div className="card-action">
                <Link to={`/case/${thisCase._source.mongo_id}`} className="right">Detail</Link>
              </div>
            </div>
          </div>
        </li>
      )
    })

    const onLimitChange = (e) => {
      console.log(e.target.value)
    }
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
      <div className="list-utils">
        <span className="result-header">Showing 1 - {caseList.length} of {esSearchResults.length} {caseList.length > 1 ? ('Cases') : ('Case')}</span>
        <div className="filters-wrapper">
          <div>
            <label>Limit</label>
            <select defaultValue="500" className="browser-default" onChange={onLimitChange}>
              <option value="500">500</option>
              <option value="5">5</option>
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
              <option value="100">100</option>
            </select>
          </div>
          <div>
            <label>Sort</label>
            <select defaultValue="relevance" className="browser-default" onChange={onLimitChange}>
              <option value="relevance">Relevance</option>
              <option value="year">Year</option>
            </select>
          </div>
        </div>
      </div>
      <ul>
        {caseList}
      </ul>
      </InfiniteScroll>
    </div>
  )
}

export default EsCaseList