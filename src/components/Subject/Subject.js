import React from 'react'
import { Link } from "react-router-dom";
import ClassroomMenu from '../ClassroomMenu/ClassroomMenu'


const topics = ['Introduction', 'Court Structure', 'Jurisdiction', 'C.I. 47', 'Commencing a Civil Action',
    'Service', 'Venue of Proceedings', 'Change of Parties', 'Action by and Against Partners', 'Appearence', 'Pleadings',
    'Summary Judgment', 'Joinder', 'Amendments', 'Dicontinuance/Withdraw', 'Admissions', 'Affidavits', 'Applications', 'Discovery and Inspection of Documents',
    'Interrogatories', 'Application for Directions', 'Trials', 'Locus In Quo/Inpections', 'Address by Counsel', 'Proceeding after delay', 'Evidence at Trial', 'Enforcement of Judgment',
    'Committal', 'Enforcement of Judgment against the State', 'Enforement of Foreign Judgments', 'Foreign Maintenance Orders',
    'Interpleader', 'Appeal', 'Probate and Administration', 'Review', 'Third Party Proceedings', 'Judicial Review', 'Election Petitions']


const Subject = ({ topicSelected }) => {
    return (
        <div id='container'>
            {topics.map((topic =>
                <div className="col s12 m4 offset-l1">
                    <div className="card z-depth-4">
                        <Link onClick={() => topicSelected(topic)} to={`/subject/${topic}`}>
                            <div className="card-content">
                                <span className="card-title truncate">{topic}</span>
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
