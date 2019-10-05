import React from 'react'
import { Link } from "react-router-dom";
import ClassroomMenu from '../ClassroomMenu/ClassroomMenu'


const topics = ['Introduction', 'Court Stucture', 'Jurisdiction', 'C.I. 47', 'Commencing a Civil Action',
    'Service', 'Venue of Proceedings', 'Change of Parties', 'Action by and Against Partners', 'Appearence']


const Subject = ({ topicSelected }) => {
    return (
        <div id='container'>
            {topics.map((topic =>
                <div className="col s12 m4 offset-l1">
                    <div className="card z-depth-4">
                        <Link onClick={() => topicSelected(topic)} to={`/subject/${topic}`}>
                            <div className="card-content">
                                <span className="card-title">{topic}</span>
                            </div>
                        </Link>
                    </div>

                </div>
            ))
            }
        </div>
    )
}

export default Subject
