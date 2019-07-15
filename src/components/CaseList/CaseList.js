import './CaseList.css'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'


const CaseList = ({ searchResult }) => {

  const caseList = searchResult.map(thisCase => {
    // each._source.caseName.replace(/^\s+/g, '')
    
      return (
        <li className="col s12 m7" key={thisCase._id}>
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
                <Link to={`/${thisCase._source.mongo_id}`} className="left">Detail</Link>
              </div>
            </div>
          </div>
        </li>
      )
    })

  return (
    <div className="caselist-wrapper">
      <div className="list-utils">
        <h6 className="result-header header">Showing {caseList.length} {caseList.length > 1 ? ('Results') : ('Result')}</h6>
        
      </div>
      
      <ul>
        {caseList}
      </ul>

      <ul className="pagination">
        <li className="disabled"><a href="#!"><i className="material-icons">chevron_left</i></a></li>
        <li className="active"><a href="#!">1</a></li>
        <li><a href="#!">2</a></li>
        <li><a href="#!">3</a></li>
        <li><a href="#!">4</a></li>
        <li><a href="#!">5</a></li>
        <li><a href="#!"><i className="material-icons">chevron_right</i></a></li>
      </ul>
    </div>
  )
    
}

export default CaseList

{/* <tr key={each._id}>
          <td>{each._source.caseName}</td>
          <td>{each._source.citation}</td>
          <td>{each._source.court}</td>
          <td>{each._source.year}</td>
        </tr> */}
