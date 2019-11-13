
import Markdown from 'react-markdown'
import React, { useEffect, useState } from 'react'
import Subject from "../Subject/Subject"

import ClassroomMenu from '../ClassroomMenu/ClassroomMenu'
import CourtStructure from './CourtStructure.md'
import Civil from './CivilProcedure.md'
import Jurisdiction from './Jurusdiction.md'
import ci47 from './ci47.md'
import cca from './cca.md'
import Service from './Service.md'
import VoP from "./VoP.md"
import CoP from './CoP.md'
import AbaAp from './AbaAp.md'
import Appearence from './Appearence.md'
import Pleadings from './Pleadings.md'
import Summary from './Summary.md'
import Joinder from './Joinder.md'
import Amendments from './Amendments.md'
import Dw from './Dw.md'
import Admissions from './Admissions.md'
import Affidavits from './Affidavits.md'
import Applications from './Applications.md'
import DaIoD from "./DaIoD.md"
// import Interrogatories from './Interrogatories.md'
// import AppofDirections from 'AppofDirections.md'
// import Trials from './Trials.md'
// import Locus from './Locus.md'
// import AddressbyCounsel from './AddressbyCounsel.md'
// import ProceedingAfterDelay from './ProceedingAfterDelay.md'
// import EvidenceAtTrial from './EvidenceAtTrial.md'
// import EnforcementOfJudgment from './EnforcementOfJudgment.md'
// import Committal from './Committal.md'
// import EnforcementOfJudgmentAgainstState from './EnforcementOfJudgementAgainstState.md'
// import EnforcementOfForeignJudgments from './EnforcementOfForeignJudgments.md'
// import ForeignMaintenanceOrders from './ForeignMaintenanceOrders.md'
// import Interpleader from './Interpleader.md'
// import Appeal from './Appeal.md'
// import Probate from './Probate.md'
// import Review from './Review.md'
// import ThirdParty from './ThirdParty.md'
// import JudicialReview from './JudicialReview.md'
// import ElectionPetitions from './ElectionPetitions.md'

const subjects = ['Introduction', 'Court Structure', 'Jurisdiction', 'C.I. 47', 'Commencing a Civil Action',
    'Service', 'Venue of Proceedings', 'Change of Parties', 'Action by and Against Partners', 'Appearence', 'Pleadings',
    'Summary Judgment', 'Joinder', 'Amendments', 'Dicontinuance/Withdraw', 'Admissions', 'Affidavits', 'Applications', 'Discovery and Inspection of Documents',
    'Interrogatories', 'Application for Directions', 'Trials', 'Locus In Quo/Inpections', 'Address by Counsel', 'Proceeding after delay', 'Evidence at Trial', 'Enforcement of Judgment',
    'Committal', 'Enforcement of Judgment against the State', 'Enforement of Foreign Judgments', 'Foreign Maintenance Orders',
    'Interpleader', 'Appeal', 'Probate and Administration', 'Review', 'Third Party Proceedings', 'Judicial Review', 'Election Petitions']

const topics = [Civil, CourtStructure, Jurisdiction, ci47, cca, Service, VoP, CoP, AbaAp, Appearence, Pleadings,
    Summary, Joinder, Amendments, Dw, Admissions, Affidavits, Applications, DaIoD,]

// Interrogatories, AppofDirections, Trials, Locus, AddressbyCounsel, ProceedingAfterDelay, EvidenceAtTrial, EnforcementOfJudgment, Committal, EnforcementOfJudgmentAgainstState, EnforcementOfForeignJudgments,
// ForeignMaintenanceOrders, Interpleader, Appeal, Probate, Review, ThirdParty, JudicialReview, ElectionPetitions


export default (props) => {

    const [topic, setTopic] = useState('')
    const [procedure, setProcedure] = useState(null)

    const changeTopic = () => {
        let top = subjects.indexOf(props.topic)
        fetch(topics[top]).then((response) => response.text()).then((text) => {
            setProcedure(text)
        })
    }
    useEffect(() => {
        changeTopic()
    }, [procedure])

    return (
        <div id='container'>
            <div className="col s10 m10 offset-l1">
                <div className='card-panel card z-depth-4'>
                    <Markdown source={procedure} />
                </div>
            </div>
            
                <Subject/>
        
            <ClassroomMenu {...props} />
         </div>
    )
}

