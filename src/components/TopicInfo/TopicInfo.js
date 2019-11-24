import Markdown from 'react-markdown'
import React, { useEffect, useState, useLayoutEffect } from 'react'
import "./TopicInfo.css"
import Subject from "../Subject/Subject"
import axios from "axios"
import ClassroomMenu from '../ClassroomMenu/ClassroomMenu'
import CourtStructure from './CourtStructure.md'
import Intro from './CivilProcedure.md'
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

const topicLabels = ['Introduction', 'Court Structure', 'Jurisdiction', 'C.I. 47', 'Commencing a Civil Action',
    'Service', 'Venue of Proceedings', 'Change of Parties', 'Action by and Against Partners', 'Appearence', 'Pleadings',
    'Summary Judgment', 'Joinder', 'Amendments', 'Dicontinuance/Withdraw', 'Admissions', 'Affidavits', 'Applications', 'Discovery and Inspection of Documents',
    'Interrogatories', 'Application for Directions', 'Trials', 'Locus In Quo/Inpections', 'Address by Counsel', 'Proceeding after delay', 'Evidence at Trial', 'Enforcement of Judgment',
    'Committal', 'Enforcement of Judgment against the State', 'Enforement of Foreign Judgments', 'Foreign Maintenance Orders',
    'Interpleader', 'Appeal', 'Probate and Administration', 'Review', 'Third Party Proceedings', 'Judicial Review', 'Election Petitions']

const topics = [Intro, CourtStructure, Jurisdiction, ci47, cca, Service, VoP, CoP, AbaAp, Appearence, Pleadings,
    Summary, Joinder, Amendments, Dw, Admissions, Affidavits, Applications, DaIoD,]

// Interrogatories, AppofDirections, Trials, Locus, AddressbyCounsel, ProceedingAfterDelay, EvidenceAtTrial, EnforcementOfJudgment, Committal, EnforcementOfJudgmentAgainstState, EnforcementOfForeignJudgments,
// ForeignMaintenanceOrders, Interpleader, Appeal, Probate, Review, ThirdParty, JudicialReview, ElectionPetitions


export default ({topic, selectTopic, ...props}) => {
    // Initialize local state
    const [markdownData, setMarkdownData] = useState(null)

    // props.topic does not change if selectTopic() is ran
    //fetch => res -> res.text() -> set(res) (in state) 
    useEffect(() => {
        // Hard coded 'Court Structure' as Intro to fix CSS issue

        let topicIdx = topicLabels.indexOf(topic)

         axios.get(topics[topicIdx])
            .then(raw => {
                setMarkdownData(raw.data)
            })
    }, [topic])
    return (
        <div className="topic-info">
            <Subject selectTopic={ selectTopic } />
            <div className="markdown-text">
                <Markdown source={markdownData} />   
            </div>
            <ClassroomMenu {...props} />
         </div>
    )
}

