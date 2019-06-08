import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import M from 'materialize-css'
import './Navigation.css'


const Navigation = ({ firstName, lastName, email, isLoggedIn, onLogout }) => {
  console.log(isLoggedIn)
  const sidenavs = document.querySelectorAll('.sidenav')
  for (let i = 0; i < sidenavs.length; i++){
    M.Sidenav.init(sidenavs[i]);
  }
  
  const collapsibles = document.querySelectorAll('.collapsible')
  for (let i = 0; i < collapsibles.length; i++){
    M.Collapsible.init(collapsibles[i]);
  }
  const featureDiscoveries = document.querySelectorAll('.tap-target')
  for (let i = 0; i < featureDiscoveries.length; i++){
    M.FeatureDiscovery.init(featureDiscoveries[i]);
  }
  const chips = document.querySelectorAll('.chips')
  for (let i = 0; i < chips.length; i++){
    M.Chips.init(chips[i])
  }
  const materialboxes = document.querySelectorAll('.materialboxed')
  for (let i = 0; i < materialboxes.length; i++){
    M.Materialbox.init(materialboxes[i]);
  }
  const modals = document.querySelectorAll('.modal')
  for (let i = 0; i < modals.length; i++){
    M.Modal.init(modals[i]);
  }
  const parallax = document.querySelectorAll('.parallax')
  for (let i = 0; i < parallax.length; i++){
    M.Parallax.init(parallax[i]);
  }
  const scrollspies = document.querySelectorAll('.scrollspy')
  for (let i = 0; i < scrollspies.length; i++){
    M.ScrollSpy.init(scrollspies[i]);
  }
  const tabs = document.querySelectorAll('.tabs')
  for (let i = 0; i < tabs.length; i++){
    M.Tabs.init(tabs[i]);
  }
  const tooltips = document.querySelectorAll('.tooltipped')
  for (let i = 0; i < tooltips.length; i++){
    M.Tooltip.init(tooltips[i]);
  }

  return (
    <div>

      {/* TOP NAVIGATION */}
      <nav>
	      <div className="nav-wrapper black">
		      <div className="row">
			      <div className="col s12">
              <a href="#!" data-target="mobile-demo" className="sidenav-trigger show-on-large"><i className="material-icons">menu</i></a>
              <Link to="/" className="brand-logo">BLE</Link>
              {isLoggedIn ? (
                <ul className="right hide-on-med-and-down">
                  <li><Link to="/login" onClick={onLogout}>Logout</Link></li>
				        </ul>
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
          <Link to="legal-index" className="waves-effect">Legal Index<i className="material-icons">search</i></Link>
        </li>
        <li className="no-padding">
          <Link to="frankinsense" className="waves-effect">Frankensense Classroom<i className="material-icons">school</i></Link>
        </li>
        <li className="no-padding">
          <Link to="court-finder" className="waves-effect">Court Finder <i className="material-icons">map</i></Link>
        </li>
        <li className="no-padding">
          <Link to="practical-practice" className="waves-effect">Practical Practice<i className="material-icons">work</i></Link>
        </li>
      </ul>
      {/* END SIDE NAVIGATION */}

      {/* SECTION-SPECIFIC TABS FOR EASY NAVIGATION WITHIN EACH SECTION  */}
      {isLoggedIn ? (
        <ul className="tabs">
          <li className="tab col s3"><a className="active" href="#test1">Test 1</a></li>
          <li className="tab col s3"><a href="#test2">Test 2</a></li>
          <li className="tab col s3"><a href="#test3">Test 3</a></li>
          <li className="tab col s3"><a href="#test4">Test 4</a></li>
        </ul>
      ) : (null)}
      

    </div>
  )
}

export default Navigation