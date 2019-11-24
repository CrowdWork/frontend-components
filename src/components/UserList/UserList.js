import React from 'react'

const UserList = ({ users }) => {
  const userList = users.map(user => {
    return (
      <tr key={user._id}>
        <td>{user.firstName}</td>
        <td>{user.lastName}</td>
        <td>{user.email}</td>
        <td>{user.phoneNumber}</td>
        <td>{user.profession}</td>
        <td>{user.isSubscriber}</td>
      </tr>
    )
  })
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Profession</th>
            <th>Subscriber</th>
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
