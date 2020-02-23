import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../components/ManageUser/ManageUser.css";

const authHeader = {
  headers: {
    Authorization: localStorage.token
  }
};

export default class EditTopic extends Component {
  state = {
    name: "",
    subject: "",
    successAlert: ""
  };

  componentDidMount() {
    this.fetchTopic();
    this.props.handleLoadSubjects();
  }

  fetchTopic = async () => {
    const _id = this.props.match.params._id;
    try {
      const topic = await axios.get(
        `${this.props.url}/topics/${_id}`,
        authHeader
      );
      this.setState(() => ({
        name: topic.data.name,
        subject: topic.data.subject
      }));
    } catch (err) {
      console.log(err);
    }
  };

  handleTopicUpdate = async e => {
    e.preventDefault();
    const { name, subject } = this.state;
    const _id = this.props.match.params._id;

    try {
      const update = await axios.patch(
        `${this.props.url}/topics/${_id}/edit`,
        {
          name,
          subject
        },
        authHeader
      );
      if (update.status === 200) {
        this.setState(() => ({
          successAlert: "User was successfully updated!"
        }));
        this.props.getTopics();
      }
    } catch (err) {
      console.log(err);
    }
  };

  renderSubjectOptions = () => {
    const { subjects } = this.props;
    console.log(`SUBJECTS: ${subjects}`);
    return subjects.map(subject => (
      <option key={subject._id} value={subject._id}>
        {subject.name}
      </option>
    ));
  };

  render() {
    const { name, subject } = this.state;
    return (
      <div className="ManageUser-container">
        {this.state.successAlert && (
          <div className="successAlert">
            <p>
              <strong>SUCCESS:</strong> {this.state.successAlert}
            </p>
            <button onClick={() => this.setState({ successAlert: false })}>
              <i className="material-icons">clear</i>
            </button>
          </div>
        )}
        <div className="container">
          <Link to="/admin/classroom" className="container--link">
            Back
          </Link>
          <h3>Edit Topic</h3>
          <form onSubmit={this.handleTopicUpdate}>
            <div>
              <div>
                <label htmlFor="name">Topic Name</label>
              </div>
              <div>
                <input
                  value={name}
                  type="text"
                  id="name"
                  onChange={e => this.setState({ name: e.target.value })}
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="subject">Subject</label>
              </div>
              <div>
                <select
                  value={subject}
                  className="browser-default"
                  id={subject}
                  onChange={e => this.setState({ subject: e.target.value })}
                >
                  <option>Select...</option>
                  {this.renderSubjectOptions()}
                </select>
              </div>
            </div>
            <div className="divider"></div>
            <button className="btn black">Save</button>
          </form>
        </div>
      </div>
    );
  }
}
