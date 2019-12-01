import React, { Component } from 'react'
import AdminCaseList from '../AdminCaseList/AdminCaseList'
import CasesFileUpload from '../CasesFileUpload/CasesFileUpload'

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
        <h3>Manage Cases</h3>
        <AdminCaseList 
          cases={this.props.cases}
        />
        <CasesFileUpload />
      </div>
    )
  }
}
