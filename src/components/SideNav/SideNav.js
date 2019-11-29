import './SideNav.css'
import React, { Fragment } from 'react'
import { Link, NavLink } from 'react-router-dom'
import M from 'materialize-css'


const SideNav = ({ firstName, lastName, email, isLoggedIn, onLogout, admin }) => {
  const sidenav = document.querySelectorAll('.sidenav')
  M.Sidenav.init(sidenav, {
    draggable: true,
    preventScrolling: true
  })
  const tooltips = document.querySelectorAll('.tooltipped')
    for (let i = 0; i < tooltips.length; i++){
      M.Tooltip.init(tooltips[i])
    }

  // Desktop sidebar only visible if logged in?

  return (
    <Fragment>
      <ul id="mobile" className="sidenav">
        <li>
          <div className="user-view" style={{zIndex: '999'}}>
            <div className="background">
              {/* <img src="https://i.imgur.com/5ui8Nqnm.jpg" alt='abstract background img' /> */}
            </div>
            {isLoggedIn && (
              <Fragment>
                <span className="white-text name">{firstName} {lastName}</span>
                <span className="white-text email">{email}</span>
              </Fragment>
            )
            }
            </div>
          </li>

          {/* <li><div className="subheader">Account</div></li> */}

          {isLoggedIn ? (
            <li><Link to="/">Account <i className="material-icons">account_circle</i></Link></li>
          ) : (
            <Fragment>
              <li><Link to="/signup">Signup Now! <i className="material-icons">account_circle</i></Link></li>
            </Fragment>
          )}
          
          {isLoggedIn ? (
            <li><Link to="/" onClick={onLogout}>Logout<i className="material-icons">power_settings_new</i></Link></li>
          ) : (
            <li><Link to="/login" className="black-text br">Sign In</Link></li>
          )}

          {isLoggedIn ? (
            <>
            {/* <li><div className="divider"></div></li> */}
            <li><div className="subheader">Services</div></li>
            <li className="no-padding">
            <Link to="/legal-index">Legal Index<i className="material-icons">search</i></Link>
          </li>
            <li className="no-padding">
            <Link to="/frankinsense">Frankensense Classroom<i className="material-icons">school</i></Link>
          </li>
            <li className="no-padding">
            <a href="#" className="tooltipped" data-position="right" data-tooltip="Coming Soon!">Court Finder <i className="material-icons">map</i></a>
          </li>
            <li className="no-padding">
            <a href="#" className="tooltipped" data-position="right" data-tooltip="Coming Soon!">Practical Practice <i className="material-icons">work</i></a>
            </li>
          </>
          ) : (
            <>
            <li><Link to="#" className="black-text">About</Link></li>
            <li><Link to="#" className="black-text">Services</Link></li>
            <li><Link to="#" className="black-text">Qualifying in Ghana</Link></li>
            </>
          )
        }
        </ul>
        
          <ul id='desktop' className="sidenav sidenav-fixed z-depth-0">
          <li>
            <div className="user-view">
              <div className="background">
                {/* <img src="https://i.imgur.com/5ui8Nqnm.jpg" alt='abstract background img' /> */}
              </div>
              {isLoggedIn && (
                <Fragment>
                  <span className="white-text name">{firstName} {lastName}</span>
                  <span className="white-text email">{email}</span>
                </Fragment>
              )}
            </div>
          </li>
          {isLoggedIn ? (
            <Fragment>
              <li><NavLink to="/account">Account</NavLink></li>
              <li>
                <ul className="collapsible collapsible-accordion">
                  <li>
                    <a className="collapsible-header">Admin</a>
                    <div className="collapsible-body">
                      <ul>
                        <li><NavLink to="/admin/legal-index">Legal Index</NavLink></li>
                        <li><NavLink to="/admin/classroom">Frankinsense Classroom</NavLink></li>
                        <li><NavLink to="/admin/users">Users</NavLink></li>
                      </ul>
                    </div>
                  </li>
                </ul>
              </li>
            </Fragment>
          ) : (
              <Fragment>
                <li><Link to="/signup">Signup Now <i className="material-icons">account_circle</i></Link></li>
              </Fragment>
            )}

          {isLoggedIn && (
            <li>
              <Link to="/login" onClick={onLogout}>
                Logout
                <i className="material-icons">power_settings_new</i>
              </Link>
            </li>
          )}
          <li><div className="divider"></div></li>
          <li><div className="subheader">Services</div></li>
          <li className="no-padding">
            <NavLink to="/legal-index">Legal Index<i className="material-icons">search</i></NavLink>
          </li>
          <li className="no-padding">
            <NavLink to="/frankinsense">Classroom<i className="material-icons">school</i></NavLink>
          </li>
          <li className="no-padding">
            <a href="#" className="tooltipped" data-position="right" data-tooltip="Coming Soon!">Court Finder <i className="material-icons">map</i></a>
          </li>
          <li className="no-padding">
            <a href="#" className="tooltipped" data-position="right" data-tooltip="Coming Soon!">Practical Practice<i className="material-icons">work</i></a>
          </li>
        </ul>
    </Fragment>

  )
}

export default SideNav