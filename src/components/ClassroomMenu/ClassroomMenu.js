import React, { Component } from 'react'
import { Button, Icon, Modal } from 'react-materialize'
import M from 'materialize-css'
import Notes from '../Note/Note'


export default class ClassroomMenu extends Component {


    componentDidMount() {
        const element = document.querySelector('.tooltipped')
        const instances = M.Tooltip.init(element);

        const modal = document.querySelector('.modal')
        M.Modal.init(modal)
    }

    render() {
        return (
            <div className="column">
                <Button
                    floating icon={<Icon>menu</Icon>}
                    fab
                    className="red"
                    large
                >
                    <Button floating icon={<Icon >assessment</Icon>} className="red btn tooltipped" data-position="left" tooltip="Quiz" />
                    <Button data-target="modal1" floating icon={<Icon >edit</Icon>} className="green modal-trigger btn tooltipped" data-position="left" tooltip="Notes" />
                </Button>
                <div id="modal1" className="modal">
                    <div className="modal-content">
                        <h4 className="container center-align">Notes</h4>
                        <Notes subject={this.props.subjectSelected} topic={this.props.topic} />
                    </div>
                </div>
            </div>
        )
    }
}
