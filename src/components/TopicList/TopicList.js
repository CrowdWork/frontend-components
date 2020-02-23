import React from "react";
import { Link } from "react-router-dom";
import "../Admin/Admin.css";

const TopicList = ({ topics }) => {
  console.log(topics);

  const topicList = topics.map(topic => {
    return (
      <tr key={topics.indexOf(topic)}>
        <td>{topic.name}</td>
        <td>{null}</td>
        <td>{topic.createdAt}</td>
        <td>
          <Link to={`/topics/${topic._id}/edit`}>View</Link>
        </td>
      </tr>
    );
  });

  return (
    <div className="SubjectList-container">
      <table className="striped">
        <thead>
          <tr>
            <th>Topic Name</th>
            <th>Subject</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>{topicList}</tbody>
      </table>
    </div>
  );
};

export default TopicList;
