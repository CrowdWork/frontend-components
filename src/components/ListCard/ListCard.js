import React from 'react'
import { Link } from 'react-router-dom'
import './ListCard.css'

const ListCard = ({ title, body, isPublic, length, listRoute, key }) => {
  const isPrivate = 'Private'
  return (
    <div id="List-wrapper" key={key}>
        <Link to={listRoute}>
          <div id="card-panel" className={`card-panel col s12 ${title === 'Favorites' && 'color-favorites'}`}>
            <div>
              <h6 className={`truncate ${title === 'Favorites' && 'color-favorites'}`}>{title} </h6>
              <span className="grey-text lighten-1">{length > 1 ? (`${length} cases`) : (length === 0 ? 'empty' : `${length} case`)}</span>
            </div>
            {isPublic ? (
              <p className="grey-text lighten-1">Public</p>
              ) : ( 
              <p className="grey-text lighten-1 truncate"> 
                {isPublic === undefined ? (body) : (isPrivate)}
              </p>
              )
            }
          </div>
        </Link>
    </div>
  )
}

export default ListCard;
