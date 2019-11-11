import './Header.css'
import M from 'materialize-css'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import SideNav from "../SideNav/SideNav"

const Header = ({ firstName, lastName, isLoggedIn, onLogout, title }) => {
  
  const dropdowns = document.querySelectorAll('.dropdown-trigger')
  for (let i = 0; i < dropdowns.length; i++){
    M.Dropdown.init(dropdowns[i], {
      coverTrigger: false,
      closeOnClick: false,
      alignment: 'left',
      hover: false,
      constrainWidth: false
    })
  }
  
    return (
          <nav className="nav-wrapper black z-depth-0 height-full">
              <a href="#!" data-target="mobile" className="sidenav-trigger"><i className="material-icons">menu</i></a>
              <Link to="/" id="brand-logo" className="brand-logo"></Link>
              {isLoggedIn ? (
              <Fragment>
                <ul className="hide-on-med-and-down right height-full valign-wrapper">
                  <li className="height-full">
                    <a href="#!" className="dropdown-trigger btn waves-light white black-text height-full display-flex z-depth-0 margin-0 valign-wrapper" data-target="user-dropdown">
                      {`${firstName[0]}${lastName[0]}`}
                      <span className="valign-wrapper"><i className="material-icons margin-0">arrow_drop_down</i></span>
                    </a>
                  </li>
                </ul>
                <ul id='user-dropdown' className='dropdown-content left'>
                  <li><Link to="/">My Profile <i className="material-icons">account_circle</i></Link></li>
                  <li className="divider" tabIndex="-1"></li>
                  <li><Link to="/login" onClick={onLogout}>Logout<i className="material-icons">power_settings_new</i></Link></li>
                </ul>
              </Fragment>
                ) : (
                <ul className="hide-on-med-and-down right nav-list">
                  <li><Link to="#">About</Link></li>
                  <li><Link to="#" >Services</Link></li>
                  <li><Link to="#" className="br">Qualifying in Ghana</Link></li>
                  <li><Link to="/signup">Signup Now!</Link></li>
                </ul>
                )
              }
          </nav>
    )
}

// <ul> tag of type "sidebar"

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