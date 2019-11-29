import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class UserDetail extends Component {

  state = {
    error: undefined
  };

  componentDidMount() {
    console.log(this.props.user)
    this.props.getUser(this.props.match.params._id)
  };

  render() {
    const { user } = this.props
    return (
      <div className="container">
        <div className="display-flex flex-align-center flex-justify-sp-btw">
          <h3>User Profile</h3>
          <Link to={`/admin/users/${user._id}`} className="btn black">Edit</Link>
        </div>
        <div>
          <div>
            <div>Name</div>
            <div>{user.firstName} {user.lastName}</div>
          </div>
        </div>
      </div>
    )
  };
};

export default UserDetail;

