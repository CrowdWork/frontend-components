import React, { Fragment, useRef, useLayoutEffect, useState } from 'react'
import { Link, useLocation, Redirect, useHistory } from 'react-router-dom'

const LandingHeader = ({ firstName, lastName, isLoggedIn, onLogout, title }) => {
  return (
    <header className="header">
      <div className="header__logo-box">
        <img src="../img/logo-white.png" alt="Logo" className="header__logo" />
      </div>
      <div className="header__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Barnor</span>
          <span className="heading-primary--sub">Law Engine</span>
        </h1>
        <a href="#" className="btn btn--white btn--animated">Discover our tours</a>
      </div>
    </header>
  )
}

export default LandingHeader