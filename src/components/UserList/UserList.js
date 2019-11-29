import React from 'react'
import { Link } from 'react-router-dom'
import './UserList.css'

const UserList = ({ users }) => {
  const userList = users.map(user => {
    return (
      <tr key={users.indexOf(user)}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.profession}</td>
        <td className="isSubscriber-cell">{user.isSubscriber ? (
          <div className="green-dot center"></div>
          ) : (
          <div className="red-dot"></div>)}
        </td>
        <td>
          <Link to={`/admin/users/${user._id}/edit`}><span className="blue-text">Manage</span></Link>
        </td>
      </tr>
    )
  })
  return (
    <div className="UserList-container">
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Profession</th>
            <th>Subscriber</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {userList}
        </tbody>
      </table>
    </div>
  )
}

export default UserList
