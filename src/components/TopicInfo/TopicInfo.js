import ClassroomMenu from '../ClassroomMenu/ClassroomMenu'
import Civil from './CivilProcedure.md'
import Markdown from 'react-markdown'
// **TODO** Write a function that parses md files and converts them to to html/JSX either on the front end or the backend.
// const TopicInfo = ({ }) => {
//     return (
//         <div id='container'>
//             <div className="col s12 m10 offset-l1">
//                 <div className='card-panel card z-depth-4'>
//                     <h5>What is Civil Procedure?</h5>
//                     <p>These are body of rules that are formulated to regulate the conduct of civil cases in court.
// </p>
//                     <p>It provides for instance how an action can be commenced, steps that ought to be taken after the commencement of an action, methods of enforcing judgments/rulings of victorious parties, and how to appeal against such provisions.</p>
//                     <p>Thus, civil proceedings could also be defined as proceedings initiated in court without the involvement of the police.
// </p>
//                     <div className='divider'></div>
//                     <h5>Sources of Civil Procedure</h5>
//                     <p>Civil Procedure comes from many sources. Articles 128 – 143 of the Constitution, define the hierarchy of the courts and their jurisdiction. The courts are also governed by the following legislation:</p>
//                     <ol>
//                         <li>Courts Act 1993 [Act 459)  </li>
//                         <p>- Courts (Amendment) Act 2002 [Act 620]</p>
//                         <p>- L.I 2211 (further amendment to Courts Act 1993)</p>
//                         <li>High Court (Civil Procedure) Rules 2004 [C.I 47] as amended by C.I. 87 High Court (Civil Procedure)(Amendment) Rules 2014</li>
//                         <li>Supreme Court Rules 1996 [C.I. 16]</li>
//                         <li>Court of Appeal Rules 1997 [C.I. 19]</li>
//                         <li>District Court Rules [C.I. 59]</li>
//                         <li>Courts Ordinance, Cap 4 (1951 Rev.) Schedule 2</li>
//                     </ol>
//                     <div className='divider'></div>
//                     <h5>Authorities on civil procedure:</h5>
//                     <li>The Constitution - The Constitution prescribes some procedural rules. For instance it describes how you can appeal to the Supreme Court. See Chapter 11 of the 1992 Constitution: The Judiciary.</li>
//                     <li>Statutes creating the various courts – e.g. Courts Act 1993 (Act 459) and Courts (Amendment) Act 2002 (Act 620). These are the statutes that create the district court and the other lower courts.</li>
//                     <li>Rules of court – The Constitution provides for a Rules of Court Committee to make subsidiary legislation in the form of constitutional instruments that outline the practice and procedure to be used in the Courts. As stated above, the District Court is governed by C.I. 59, the High Court and Circuit Court are governed by C.I.47, the Court of Appeal is governed by C.I.19 and the Supreme Court is governed by C.I.16. </li>
//                     <li>Case law from the superior courts which discuss and settle on the acceptable procedure to be used.</li>
//                     <li>Practice Directions – These are directions given by the superior courts which show and direct the way a particular rule of court should be complied with and observed. They are reported in the Law Reports in the same manner as cases are reported.</li>
//                     <li>Leading Textbook: "Civil Procedure in Ghana" by S. Kwame Tetteh</li>
//                 </div>
//             </div>
//             <ClassroomMenu />
//         </div>
//     )
// }




// export default TopicInfo


import React, { Component } from 'react'

export default class TopicInfo extends Component {

    state = {
        civilProcedure: null
    }


    componentWillMount() {
        fetch(Civil).then((response) => response.text()).then((text) => {
            this.setState({ civilProcedure: text })
        })
    }
    render() {
        return (

            <div id='container'>
                <div className="col s12 m10 offset-l1">
                    <div className='card-panel card z-depth-4'>
                        <Markdown
                            source={this.state.civilProcedure}
                        />

                    </div>
                </div>
                <ClassroomMenu />
            </div>
        )
    }
}
