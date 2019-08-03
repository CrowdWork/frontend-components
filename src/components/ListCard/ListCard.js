import React from 'react'
import { Link } from 'react-router-dom'

 const ListCard = ({ title, isPublic, listRoute }) => {
  return (
    <div id="List-wrapper" className="row">
      <div className="col s12">
        <Link to={listRoute}>
          <div id="card-panel" className="card-panel hoverable">
            <h5 className="truncate">{title}</h5>
            {isPublic ? (
              <p className="grey-text lighten-2">Public</p>
              ) : (
              <p className="transparent-text lighten-2">Private</p>)
            }
          </div>
        </Link>
      </div>
    </div>
  )
}

export default ListCard