import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'

class Home extends Component {
  state = {
    open: true,
  };
  
  render() {
    const { isLoggedIn, firstName, lastName, email } = this.props
    {console.log(firstName,'LOGGED IN:',isLoggedIn)}
    return (
      
      <div>
        <h4>Your Account</h4>
        <div className="divider"></div>
        <h5>Name</h5>
        <p>{firstName} {lastName}</p>
        <h5>Email</h5>
        <p>{email}</p>
        <div className="divider"></div>
      </div>
    );
  }
}

export default Home
