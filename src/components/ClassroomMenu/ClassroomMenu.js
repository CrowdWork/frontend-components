import React, { useState, useEffect } from 'react'
import { Button, Icon, Modal } from 'react-materialize'
import M from 'materialize-css'
import useMedia from "../../fx/useMedia"
///import Notes from '../Note/Note'
import NotesModal from "../Modal/NotesModal"
import Quiz from "./Quiz"

export default ({ onAddNote }) => {
  const [noteType, setNoteType] = useState("")
  const [quizVisible, setQuizVisible] = useState(false)

  useEffect(() => {
    const element = document.querySelector('.tooltipped')
    const instances = M.Tooltip.init(element);

    const modal = document.querySelector('.modal')

    M.Modal.init(modal)
  })

  const right = useMedia(
    ['(min-width: 1000px)', '(min-width: 600px)'],
    ["45vw", "80%"],
    "45vw"
  )

  return (
    <div className="column menu" style={{ right }}>

      <Button
        floating icon={<Icon>menu</Icon>}
        fab
        className="red "
        large
      >
        <Button floating
          icon={<Icon>assessment</Icon>}
          className="red btn tooltipped modal-trigger"
          data-position="left"
          tooltip="Quiz"
          data-target="modalQuiz"
          onClick={() => setQuizVisible(true)}
        />
        <Button data-target="modalNote" floating icon={<Icon >edit</Icon>} className="green modal-trigger btn tooltipped" data-position="left" tooltip="Notes" />
      </Button>
      <NotesModal onAddNote={onAddNote} />
      {quizVisible && <Quiz close={setQuizVisible} />}
      {/*
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4 className="container center-align">Notes</h4>
                        <Notes subject={this.props.subjectSelected} topic={this.props.topic} />
                    </div>
                </div>
            */}
    </div>
  )
}
