import React, { Component } from 'react'

export default class AdminUsers extends Component {

  async componentDidMount() {
    this.props.getUsers()
  }

  render() {
    return (
      <div>
        {this.props.users || 'NO USERS FOUND'}
      </div>
    )
  }
}
