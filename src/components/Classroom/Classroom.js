import React from 'react'
import { Link } from 'react-router-dom'
import './Classroom.css'
import ClassMenu from "../ClassroomMenu/ClassroomMenu"



const Classroom = ({ subjectCache, subjectSelected }) => {
    const subjectList = ['Civil Procedure', 'Ghana Legal Systems', 'Law of Interpretation', 'Crimnial Law', "Family Law", 'Constitutional Law', 'Evidence']
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

