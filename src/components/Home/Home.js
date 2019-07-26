import './Home.css'
import M from 'materialize-css'
import React, { Component } from 'react';


class Home extends Component {
  state = {}

  componentDidMount() {
    console.log('Home mounted')
    const elems = document.querySelectorAll('.collapsible')
    M.Collapsible.init(elems)
  }
  render() {
    
    const { firstName, lastName, email } = this.props

    return (
      <div className="account-overview-wrapper">
        <h3>Dashboard</h3>
        <div className="divider"></div>
        <div className="row">
          <div className="col s12">
            <h4>Account</h4>
            <p>Manage your account settings.</p>
          </div>
          <ul className="no-padding collapsible col s12 m12 l8">
            <li>
              <div className="collapsible-header"><i className="material-icons">perm_identity</i>Personal Details</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">payment</i>Billing & Subscriptions</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">security</i>Password & Security</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
          </ul>
          </div>
        <div className="row">
          <div className="col s12">
            <h4>Collections</h4>
            <p>Manage your Favourites, Lists, and Notes.</p>
          </div>
          
          <ul className="no-padding collapsible col s12 m12 l8">
            <li>
              <div className="collapsible-header"><i className="material-icons">favorite</i>Favorites</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">list</i>Lists</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
            <li>
              <div className="collapsible-header"><i className="material-icons">speaker_notes</i>Notes</div>
              <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
            </li>
          </ul>
          </div>
      </div>
    );
  }
}

export default Home
