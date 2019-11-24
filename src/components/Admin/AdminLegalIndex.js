import axios from 'axios'
import Papa from 'papaparse'
import React, { Component } from 'react'

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}}

class AdminLegalIndex extends Component {

  onFileUpload = async (e) => {
    e.preventDefault()
    const file = document.getElementById('upload').files[0]
    if (!file) {
      return window.alert('Please select a file to upload!')
    }
    document.querySelector("#upload").disabled = true
    document.querySelector("#upload-btn").disabled = true
    try {
      await Papa.parse(file, {
        header: true,
        worker: true,
        skipEmptyLines: true,
        step: row => {
          console.log(row.data)
          axios.post(`${this.props.url}/cases`, {
            'caseName': row.data['Case Name'],
            'citation': row.data['Citation'],
            'year': row.data['Year'],
            'judges': row.data['Judges'],
            'court': row.data['Court'],
            'keyWords': row.data['Key Words'],
            'linkedCasesReferredTo': row.data['Linked Cases Referred To'],
            'unlinkedCasesReferredTo': row.data['Unlinked Cases Referred To'],
            'documentType': row.data['Document Type'],
            'suitNumber': row.data['Suit No.'],
            'summary': row.data['Summary'],
            'dateOfJudgement': row.data['Date of Judgement']
          })
        },
        complete: results => {
          document.querySelector("#upload").disabled = false
          document.querySelector("#upload-btn").disabled = false
        }
      }, authHeader)
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    return (
      <div>
        <form onSubmit={this.onFileUpload}>
          <div className="file-field input-field">
            <div className="btn">
              <span>File</span>
              <input type="file" id="upload" accept=".csv" />
            </div>
            <div className="file-path-wrapper">
              <input className="file-path validate" type="text" />
            </div>
          </div>
          <button id="upload-btn" type="submit" className="btn" name='action'>
            <span>Upload</span>
          </button>
        </form>
      </div>
    )
  }
}

export default AdminLegalIndex