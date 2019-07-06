import React, { Fragment } from 'react'
import './CaseList.css'

const CaseList = ({ searchResult }) => {
    const caseList = searchResult.map(each => {
      each._source.caseName.replace(/^\s+/g, '')
      if (each._source.caseName.length > 50) {
        each._source.caseName = each._source.caseName.substring(0, 50) + '...'
      }
      return (
        <li className="col s12 m7" key={each._id}>
          <div className="card horizontal">
            <div className="card-stacked">
              <div className="card-content">
                <div>
                  <h6 className="header"><strong>{each._source.caseName}</strong></h6>
                  <p>{each._source.citation}</p>
                  <p>{each._source.court}</p>
                </div>
                <div>
                  <p>{each._source.year}</p>
                </div>
              </div>
              <div className="card-action">
                <a href="#" className="left">Detail</a>
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
