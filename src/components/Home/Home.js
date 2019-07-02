import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import './Home.css'

class Home extends Component {
  state = {
    open: true,
  };
  
  render() {
    const { isLoggedIn, firstName, lastName, email } = this.props
    {console.log(firstName,'LOGGED IN:',isLoggedIn)}

    return (
      <div className="account-overview-wrapper">
        <h4>Account Overview</h4>
        <div className="divider"></div>
        <h6>NAME</h6>
        <p>{firstName} {lastName}</p>
        <h6>EMAIL</h6>
        <p>{email}</p>
        <div className="divider"></div>
      </div>
    );
  }
}

export default Home
