import React, { Component } from 'react'
import UserList from '../UserList/UserList'
import './Admin.css'

export default class AdminUsers extends Component {

  state = {
    skip: 0,
    limit: null
  }

  async componentDidMount() {
    // const { skip, limit } = this.state
    await this.props.getUsers()
  }

  // renderPageNumbers = () => {
  //   const pageNumbers = [];
  //   for (let i = 1; i <= Math.ceil(this.props.userCount / this.state.limit); i++) {
  //     pageNumbers.push(i)
  //   }
  //   pageNumbers.map(number => {
  //     return (
  //       <li 
  //         key={number}
  //         id={number}
  //         className="waves-effect"
  //         onClick={this.handleClick}
  //       >
  //         {number}
  //       </li>
  //     )  
  //   })
  // }

  // onPageUp = () => {
  //   const { skip, limit } = this.state
  //   this.setState((prevState) => ({ skip: prevState.skip + 1 }))
  //   this.props.getUsers(skip, limit)
  // }

  render() {
    return (
      <div className="AdminUsers-container">
        <h2>Manage Users</h2>
        <UserList
          users={this.props.users}
        />
        {/* <ul className="pagination">
          <li><a><i className="material-icons">chevron_left</i></a></li>
          {this.renderPageNumbers()}
          <li className="waves-effect"><a onClick={() => this.onPageUp()}><i className="material-icons">chevron_right</i></a></li>
        </ul> */}
      </div>
    )
  }
}
