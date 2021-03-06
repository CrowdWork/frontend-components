import React from 'react'
import { Link } from "react-router-dom";
import ClassroomMenu from '../ClassroomMenu/ClassroomMenu'
import "./Subject.css"
// will eventually be dynamic by subject instead of static to Civil Procedure


const topics = ['Introduction', 'Court Structure', 'Jurisdiction', 'C.I. 47', 'Commencing a Civil Action',
    'Service', 'Venue of Proceedings', 'Change of Parties', 'Action by and Against Partners', 'Appearence', 'Pleadings',
    'Summary Judgment', 'Joinder', 'Amendments', 'Dicontinuance/Withdraw', 'Admissions', 'Affidavits', 'Applications', 'Discovery and Inspection of Documents',
    'Interrogatories', 'Application for Directions', 'Trials', 'Locus In Quo/Inpections', 'Address by Counsel', 'Proceeding after delay', 'Evidence at Trial', 'Enforcement of Judgment',
    'Committal', 'Enforcement of Judgment against the State', 'Enforement of Foreign Judgments', 'Foreign Maintenance Orders',
    'Interpleader', 'Appeal', 'Probate and Administration', 'Review', 'Third Party Proceedings', 'Judicial Review', 'Election Petitions']


const Subject = ({ selectTopic }) => {
  return (
    <div className="pick-subjects">
        {topics.map((topic =>
          
            <Link   
              onClick={() => { selectTopic(topic) }} 
              to={`/subject/${topic}`}
              className="subject-link"
            >
              {topic}
            </Link>
       
        ))
        }
    </div>
  )
}

export default Subject
