import React from "react";
import "../Admin/Admin.css";

const SubjectList = ({ subjects }) => {
  console.log(subjects);
  const subjectList = subjects.map(subject => {
    return (
      <tr key={subjects.indexOf(subject)}>
        <td>{subject.name}</td>
        <td>{subject.createdAt}</td>
      </tr>
    );
  });
  return (
    <div className="SubjectList-container">
      <table className="striped">
        <thead>
          <tr>
            <th>Subject Name</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>{subjectList}</tbody>
      </table>
    </div>
  );
};

export default SubjectList;
