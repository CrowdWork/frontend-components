import React from "react";
import "../Admin/Admin.css";

const QuizList = ({ quizzes }) => {
  console.log(quizzes);
  const quizList = quizzes.map(quiz => {
    console.log(quiz);
    return (
      <tr key={quizzes.indexOf(quiz)}>
        <td>{quiz.question}</td>
        <td>{quiz.topic.name}</td>
        <td>{quiz.createdAt}</td>
      </tr>
    );
  });
  return (
    <div className="SubjectList-container">
      <table className="striped">
        <thead>
          <tr>
            <th>Quiz Name</th>
            <th>Topic</th>
            <th>Date Created</th>
          </tr>
        </thead>
        <tbody>{quizList}</tbody>
      </table>
    </div>
  );
};

export default QuizList;
