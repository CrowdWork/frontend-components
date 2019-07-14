import React from 'react'

const Preloader = (props) => {
  return (
    <div className="progress">
      <div className="indeterminate"></div>
    </div>
  )
}

Preloader.defaultProps = {
  message: 'Loading...'
}

export default Preloader
