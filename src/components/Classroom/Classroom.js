import React from 'react'
import { Link } from 'react-router-dom'
import './Classroom.css'



const Classroom = ({ subjectCache, subjectSelected }) => {
    const { subs } = subjectCache
    const subjectList = subs.subjects
    return (
        < div className="row" id='container' >
            {subjectList.map((subject =>
                <div className="col s12 m4 offset-l1">
                    <div className="card z-depth-4Name hoverable">
                        <Link onClick={() => subjectSelected(subject)} to={`classroom/${subject}`}>
                            <div className="card-content">
                                <span className="card-title">{subject}</span>
                            </div>
                        </Link>
                    </div>
                </div>
            ))
            }
        </div >
    )
}

export default Classroom
