import React from 'react'
import { Link } from 'react-router-dom'

 const ListCard = ({ title, body, isPublic, listRoute }) => {
  const isPrivate = 'Private'
  return (
    <div id="List-wrapper" className="row">
      <div className="col s12">
        <Link to={listRoute}>
          <div id="card-panel" className="card-panel hoverable">
            <h5 className="truncate">{title}</h5>
            {isPublic ? (
              <p className="grey-text lighten-2">Public</p>
              ) : (
              <p className="grey-text lighten-2 truncate">{isPublic === undefined ? (body) : (isPrivate)}</p>)
            }
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ListCard