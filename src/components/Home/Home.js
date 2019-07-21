import React, { Component } from 'react';
import './Home.css'

class Home extends Component {
  state = {
    open: true,
  };
  
  render() {
    const { firstName, lastName, email } = this.props

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
