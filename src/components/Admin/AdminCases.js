import React, { Component } from 'react'
import AdminCaseList from '../AdminCaseList/AdminCaseList'
import CasesFileUpload from '../CasesFileUpload/CasesFileUpload'
import './Admin.css'

export default class AdminCases extends Component {

  state = {
    error: undefined
  }

  async componentDidMount() {
    console.log("AdminCases MOUNTED")
    // const { skip, limit } = this.state
    await this.props.getCases()
  }

  render() {
    console.log("RENDERING AdminCases")
    return (
      <div className="AdminCases-container">
        <h2>Manage Cases</h2>
        <AdminCaseList 
          cases={this.props.cases}
        />
        <CasesFileUpload />
      </div>
    )
  }
}
