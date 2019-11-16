import React, { useState, Component } from "react"

export default class NotesModal extends Component {

    state = {
        noteTitle: "",
        noteBody: "",
    }

    render() {
        const { onAddNote, noteType } = this.props
        return (
            <div id="modalNote" className="modal">
            <div className="modal-content">
                <h4>New note...</h4>
            <form className="col s12" onSubmit={(e) => onAddNote(e, this.state)}>
               <div className="row">
                    <div className="input-field col s12">
          <input id="title" placeholder="Title..." value={this.state.noteTitle} type="text" onChange={(e) => this.setState({ noteTitle: e.target.value })}/>
        </div>
        <div className="input-field col s12">
          <textarea id="body" placeholder="Take a note..." className="materialize-textarea" value={this.state.noteBody} onChange={(e) => this.setState({ noteBody: e.target.value })}></textarea>
        </div>
      </div>
      <button type="submit" name="action" className="modal-close btn-flat right">Save Note</button>
    </form>
     </div>
</div>
        )
    }
}