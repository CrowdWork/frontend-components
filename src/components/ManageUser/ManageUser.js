import React, { Component } from 'react';
import axios from 'axios';
import './ManageUser.css'

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

export default class ManageUser extends Component {

  state = {
    firstName: '',
    lastName: '',
    email: '',
    phoneNumber: '',
    profession: '',
    isSubscriber: false,
    successAlert: ''
  }

  componentDidMount() {
    this.fetchUser();
  };

  fetchUser = async () => {
    const _id = this.props.match.params._id
    try {
      const user = await axios.get(`${this.props.url}/api/admin/users/${_id}`, authHeader)
      this.setState(() => ({ 
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        email: user.data.email,
        phoneNumber: user.data.phoneNumber,
        profession: user.data.profession,
        isSubscriber: user.data.isSubscriber
      }))
    } catch (err) {
      console.log(err)
    }
  }
  handleUserUpdate = async (e) => {
    const { firstName, lastName, email, phoneNumber, profession, isSubscriber } = this.state
    const _id = this.props.match.params._id
    e.preventDefault();
    try {
      const update = await axios.patch(`${this.props.url}/api/admin/users/${_id}`, {
        firstName, lastName, email, phoneNumber, profession, isSubscriber
      }, authHeader)
      if (update.status === 200) {
        this.setState(() => ({ successAlert: 'User was successfully updated!' }))
        this.props.getUsers()
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { firstName, lastName, email, phoneNumber, profession, isSubscriber } = this.state
    return (
      <div className="ManageUser-container">
        {this.state.successAlert && (
          <div class="successAlert">
            <p><strong>SUCCESS:</strong> {this.state.successAlert}</p>
            <button onClick={() => this.setState({ successAlert: false })}><i className="material-icons">clear</i></button>
          </div>
        )}
        <div className="container">
          <h3>Manage User</h3>
          <form onSubmit={this.handleUserUpdate}>
            <div>
              <div>
                <label htmlFor="firstName">First Name</label>
              </div>
              <div>
                <input value={firstName} type="text" id="firstName" name="firstName" onChange={(e) => this.setState({ firstName: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="lastName">Last Name</label>
              </div>
              <div>
                <input value={lastName} type="text" id="lastName" name="lastName" onChange={(e) => this.setState({ lastName: e.target.value })} />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="email">Email</label>
              </div>
              <div>
                <input value={email} type="email" id="email" name="email" onChange={(e) => this.setState({ email: e.target.value })} />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="phoneNumber">Phone Number</label>
              </div>
              <div>
                <input value={phoneNumber} type="text" id="phoneNumber" name="phoneNumber" onChange={(e) => this.setState({ phoneNumber: e.target.value })} />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="profession">Profession</label>
              </div>
              <div>
                <input value={profession} type="text" id="profession" name="profession" onChange={(e) => this.setState({ profession: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="subscriber">Subscriber</label>
              </div>
              <div>
                <select value={isSubscriber} className="browser-default" id="isSubscriber" name="isSubscriber" onChange={(e) => this.setState({ isSubscriber: e.target.value })} >
                  <option value="false">False</option>
                  <option value="true">True</option>
                </select>
              </div>
            </div>
            <div className="divider"></div>
            <button className="btn black">Save</button>
          </form>
        </div>
      </div>
      
    )
  }
}
