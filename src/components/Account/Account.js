import './Account.css'
import M from 'materialize-css'
import React, { Component } from 'react'
import { Link } from 'react-router-dom'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

class Account extends Component {
  state = {
      listTitle: '',
      listPublic: false,
      noteTitle: '',
      noteBody: '',
      selectedOption: 'my-lists'
  }

  componentDidMount() {
    console.log('Home mounted')
    const elems = document.querySelectorAll('.collapsible')
    M.Collapsible.init(elems)
    // const modals = document.querySelectorAll('.modal')
    // for (let i = 0; i < modals.length; i++){
    //   M.Modal.init(modals[i])
    // }
  }

  render() {
    console.log(this.props.userID)
    console.log(this.props.profession)
    return (
      <div className="account-overview-wrapper">
          <div className="col s12">
            <div className="row">
              <div className="col s12">
                <h5>Account</h5>
                <p>Manage your account settings.</p>
              </div>
              <div className="col s12">
              <ul className="no-padding collapsible col s12 l8">
                <li>
                  <div className="collapsible-header"><i className="material-icons">perm_identity</i>Personal Details</div>
                  <div className="collapsible-body">
                    <div className="row">
                      <div className="col s12 m4 offset-m2">
                        <h6>NAME</h6>
                        <p><b>{this.props.firstName} {this.props.lastName}</b></p>
                      </div>
                      <div className="col s12 m4">
                        <h6>EMAIL</h6>
                        <p><b>{this.props.email}</b></p>
                      </div>
                      <div className="col s12 m4 offset-m2">
                        <h6>PHONE</h6>
                        <p><b>{this.props.phoneNumber}</b></p>
                      </div>
                      <div className="col s12 m4">
                        <h6>PROFESSION</h6>
                        <p><b>{this.props.profession}</b></p>
                      </div>
                    </div>
                    
                  </div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">payment</i>Billing & Subscriptions</div>
                  <div className="collapsible-body"><Link to='/subscribe' className="btn-flat indigo-text">Test Subscription</Link></div>
                </li>
                <li>
                  <div className="collapsible-header"><i className="material-icons">security</i>Password & Security</div>
                  <div className="collapsible-body"><span>Lorem ipsum dolor sit amet.</span></div>
                </li>
              </ul>
              </div>
              
            </div>
          </div>
      </div>
    );
  }
}

export default Account

{/* <ul className="no-padding collapsible col s12 m12 l8">
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
          </ul> */}