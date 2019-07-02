import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import './Navigation.css'


const Navigation = ({ firstName, lastName, email, isLoggedIn, onLogout }) => {
  console.log(isLoggedIn)

  const dropdowns = document.querySelectorAll('.dropdown-trigger')
  for (let i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      coverTrigger: false,
      closeOnClick: false,
      alignment: 'left',
      hover: true,
      constrainWidth: false
    })
  }
  const sidenavs = document.querySelectorAll('.sidenav')
  for (let i = 0; i < sidenavs.length; i++){
    M.Sidenav.init(sidenavs[i]);
  }
  // const tabs = document.querySelectorAll('.tabs')
  // for (let i = 0; i < tabs.length; i++){
  //   M.Tabs.init(tabs[i], {});
  // }
  // const collapsibles = document.querySelectorAll('.collapsible')
  // for (let i = 0; i < collapsibles.length; i++){
  //   M.Collapsible.init(collapsibles[i]);
  // }
  // const featureDiscoveries = document.querySelectorAll('.tap-target')
  // for (let i = 0; i < featureDiscoveries.length; i++){
  //   M.FeatureDiscovery.init(featureDiscoveries[i]);
  // }
  // const chips = document.querySelectorAll('.chips')
  // for (let i = 0; i < chips.length; i++){
  //   M.Chips.init(chips[i])
  // }
  // const materialboxes = document.querySelectorAll('.materialboxed')
  // for (let i = 0; i < materialboxes.length; i++){
  //   M.Materialbox.init(materialboxes[i]);
  // }
  // const modals = document.querySelectorAll('.modal')
  // for (let i = 0; i < modals.length; i++){
  //   M.Modal.init(modals[i]);
  // }
  // const parallax = document.querySelectorAll('.parallax')
  // for (let i = 0; i < parallax.length; i++){
  //   M.Parallax.init(parallax[i]);
  // }
  // const scrollspies = document.querySelectorAll('.scrollspy')
  // for (let i = 0; i < scrollspies.length; i++){
  //   M.ScrollSpy.init(scrollspies[i]);
  // }
  // const tooltips = document.querySelectorAll('.tooltipped')
  // for (let i = 0; i < tooltips.length; i++){
  //   M.Tooltip.init(tooltips[i]);
  // }
  return (
    <div>
      {/* TOP NAVIGATION */}
      <nav>
	      <div className="nav-wrapper black">
		      <div id="upper-top-nav" className="row">
			      <div className="col s12">
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
              <Link to="/" className="brand-logo">BLE</Link>
              {isLoggedIn ? (
                <Fragment>
                <ul className="right hide-on-med-and-down">
                  <li><a href="#" className="dropdown-trigger btn black" data-target="user-dropdown">{firstName}</a></li>
				        </ul>
                <ul id='user-dropdown' className='dropdown-content'>
                <li><Link to="/">My Profile <i className="material-icons">account_circle</i></Link></li>
                  <li className="divider" tabIndex="-1"></li>
                  <li><Link to="/login" onClick={onLogout}>Logout<i className="material-icons">power_settings_new</i></Link></li>
                </ul>
                </Fragment>
                
                ) : (
                <ul className="right hide-on-med-and-down">
                  <li><Link to="/signup">Signup</Link></li>
				        </ul>)
                }
                
			      </div>			
		      </div>
	      </div>
      </nav>
      {/* END TOP NAVIGATION */}

      {/* SIDE NAVIGATION */}
      <ul id="mobile-demo" className="sidenav">
        <li>
          <div className="user-view">
          <div className="background">
            <img src="https://i.imgur.com/5ui8Nqnm.jpg" />
          </div>
          <img className="circle padding-bottom" src="http://placehold.it/640/333" />
          {isLoggedIn ? 
            ( <Fragment>
                <span className="white-text name">{firstName} {lastName}</span>
                <span className="white-text email">{email}</span>
              </Fragment>
            ) : (null)
          }
          </div>
        </li>
        <li><div className="subheader">Account</div></li>
        {isLoggedIn ? (
          <li><Link to="/">My Profile <i className="material-icons">account_circle</i></Link></li>
        ) : (
          <Fragment>
            <li><Link to="/signup">Guest <i className="material-icons">account_circle</i></Link></li>
          </Fragment>
        )}
        
        {isLoggedIn ? (<li><Link to="/login" onClick={onLogout}>Logout<i className="material-icons">power_settings_new</i></Link></li>) : (null)}
        <li><div className="divider"></div></li>
        <li><div className="subheader">Services</div></li>
        <li className="no-padding">
          <Link to="/legal-index">Legal Index<i className="material-icons">search</i></Link>
        </li>
        <li className="no-padding">
          <Link to="/frankinsense">Frankensense Classroom<i className="material-icons">school</i></Link>
        </li>
        <li className="no-padding">
          <Link to="/court-finder">Court Finder <i className="material-icons">map</i></Link>
        </li>
        <li className="no-padding">
          <Link to="/practical-practice">Practical Practice<i className="material-icons">work</i></Link>
        </li>
      </ul>
      {/* END SIDE NAVIGATION */}
      
      <ul className="tabs tabs-fixed-width">
          <li className="tab col s3">
            <Link to="/legal-index">Legal Index</Link>
          </li>
          <li className="tab col s3">
            <Link to="/frankinsense">Frankinsense Classroom</Link>
          </li>
          <li className="tab col s3">
            <Link to="/court-finder">Court Finder</Link>
          </li>
          <li className="tab col s3">
            <Link to="/practical-practice">Practical Practice</Link>
          </li>
        </ul>
    </div>
  )
}

export default Navigation