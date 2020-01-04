import React from 'react'
import '../Admin/Admin.css'

const TopicList = ({ topics }) => {
  console.log(topics)
  const topicList = topics.map(topic => {
    return (
      <tr key={topics.indexOf(topic)}>
        <td>{topic.name}</td>
      </tr>
    )
  })
  return (
    <div className="SubjectList-container">
      <table>
        <thead>
          <tr>
            <th>Topics</th>
          </tr>
        </thead>
        <tbody>
          {topicList}
        </tbody>
      </table>
    </div>
  )
}

export default TopicList;