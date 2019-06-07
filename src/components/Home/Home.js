import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'
import SimpleTable from '../SimpleTable';

class Home extends Component {
  state = {
    open: true,
  };

  
  render() {
    const { isLoggedIn, firstName } = this.props
    {console.log(firstName,'LOGGED IN:',isLoggedIn)}
    return (
      
      <div>
        <h2>Hi, {firstName}</h2>
      </div>
    );
  }
}

export default Home
