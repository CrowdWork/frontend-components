import React from 'react'
import { Link } from 'react-router-dom'
import './Card.css'

const Card = ({ title, link, src }) => {
  return (
      <div className="card">
        <div className="card-image">
          <img src={src} />
          <span className="card-title">{title}</span>
          <Link to={link} className="btn-large waves-effect waves-light right red z-depth-0 position-btn">Learn More</Link>
        </div>
        {/* <div className="card-content">
          <p>I am a very simple card. I am good at containing small bits of information. I am convenient because I require little markup to use effectively.</p>
        </div> */}
      </div>
  )
}
export default Card