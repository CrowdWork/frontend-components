import './Header.css'
import M from 'materialize-css'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'


const Header = ({ firstName, isLoggedIn, onLogout }) => {
  
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
  
    return (
      <div className="Header-container">
        <div>
        <nav>
          <div className="nav-wrapper black">
            <div id="upper-top-nav" className="row">
              <div className="col s12">
                <a href="#!" data-target="mobile" className="sidenav-trigger hide-on-large"><i className="material-icons">menu</i></a>
                <Link to="/" className="brand-logo">Barnor Law Engine</Link>
                {isLoggedIn ? (
                  <Fragment>
                  <ul className="right hide-on-med-and-down">
                    <li><a href="#!" className="dropdown-trigger btn black" data-target="user-dropdown">{firstName}<i className="material-icons">arrow_drop_down</i></a></li>
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
        </div>
        
      </div>
    )
}

export default Header

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