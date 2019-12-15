import React, { Component } from 'react';
import axios from 'axios';
import './ManageCase.css';

const authHeader = {
  headers: {
  'Authorization': localStorage.token
}};

export default class ManageCase extends Component {

  state = {
    caseName: '',
    citation: '',
    court: '',
    createdAt: '',
    dateOfJudgement: '',
    documentType: '',
    judges: '',
    keyWords: '',
    linkedCasesReferredTo: '',
    suitNumber: '',
    summary: '',
    successAlert: '',
    unlinkedCasesReferredTo: '',
    updatedAt: '',
    year: ''
  };

  componentDidMount() {
    this.fetchCase();
  };

  fetchCase = async () => {
    const _id = this.props.match.params._id;
    try {
      const courtCase = await axios.get(`${this.props.url}/api/admin/cases/${_id}`, authHeader)
      console.log(courtCase.data)
      this.setState(() => ({
        caseName: courtCase.data.caseName,
        citation: courtCase.data.citation,
        court: courtCase.data.court,
        createdAt: courtCase.data.createdAt,
        dateOfJudgement: courtCase.data.dateOfJudgement,
        documentType: courtCase.data.documentType,
        judges: courtCase.data.judges,
        keyWords: courtCase.data.keyWords,
        linkedCasesReferredTo: courtCase.data.linkedCasesReferredTo,
        suitNumber: courtCase.data.suitNumber,
        summary: courtCase.data.summary,
        unlinkedCasesReferredTo: courtCase.data.unlinkedCasesReferredTo,
        updatedAt: courtCase.data.updatedAt,
        year: courtCase.data.year
      }));
    } catch (err) {
      console.log(err)
    }
  };
  handleCaseUpdate = async (e) => {
    const { caseName, citation, year, judges, court, keyWords, documentType, linkedCasesReferredTo, unlinkedCasesReferredTo } = this.state
    const _id = this.props.match.params._id
    e.preventDefault();
    try {
      const update = await axios.patch(`${this.props.url}/api/admin/cases/${_id}`, {
        caseName, citation, year, judges, court, keyWords, documentType, linkedCasesReferredTo, unlinkedCasesReferredTo
      }, authHeader)
      if (update.status === 200) {
        this.setState(() => ({ successAlert: 'Case was successfully updated!' }))
        this.props.getCases()
      }
    } catch (err) {
      console.log(err)
    }
  }

  render() {
    const { caseName, citation, court, documentType, judges, keyWords, linkedCasesReferredTo, unlinkedCasesReferredTo, year } = this.state
    return (
      <div className="ManageCase-container">
        {this.state.successAlert && (
          <div className="successAlert">
            <p><strong>SUCCESS: {this.state.successAlert}</strong></p>
            <button onClick={() => this.setState({ successAlert: false })}><i className="material-icons">clear</i></button>
          </div>
        )}
        <div className="container">
          <h3>Manage Case</h3>
          <form onSubmit={this.handleCaseUpdate}>
            <div>
              <div>
                <label htmlFor="caseName">Case Name</label>
              </div>
              <div>
                <input value={caseName} type="text" id="caseName" name="caseName" onChange={(e) => this.setState({ caseName: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="citation">Citation</label>
              </div>
              <div>
                <input value={citation} type="text" id="citation" name="citation" onChange={(e) => this.setState({ citation: e.target.value })} />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="year">Year</label>
              </div>
              <div>
                <input value={year} type="text" id="year" name="year" onChange={(e) => this.setState({ year: e.target.value })} />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="judges">Judge(s)</label>
              </div>
              <div>
                <input value={judges} type="text" id="judges" name="judges" onChange={(e) => this.setState({ judges: e.target.value })} />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="court">Court</label>
              </div>
              <div>
                <input value={court} type="text" id="court" name="court" onChange={(e) => this.setState({ court: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="keyWords">Keyword(s)</label>
              </div>
              <div>
                <input value={keyWords} type="text" id="keyWords" name="keyWords" onChange={(e) => this.setState({ keyWords: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="documentType">Document Type</label>
              </div>
              <div>
                <input value={documentType} type="text" id="documentType" name="documentType" onChange={(e) => this.setState({ documentType: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="linkedCasesReferredTo">Linked Cases</label>
              </div>
              <div>
                <input value={linkedCasesReferredTo} type="text" id="linkedCasesReferredTo" name="linkedCasesReferredTo" onChange={(e) => this.setState({ linkedCasesReferredTo: e.target.value })}/>
              </div>
            </div>
            <div>
              <div>
                <label htmlFor="unlinkedCasesReferredTo">Unlinked Cases</label>
              </div>
              <div>
                <input value={unlinkedCasesReferredTo} type="text" id="unlinkedCasesReferredTo" name="unlinkedCasesReferredTo" onChange={(e) => this.setState({ unlinkedCasesReferredTo: e.target.value })}/>
              </div>
            </div>
            <div className="divider"></div>
            <button className="btn black">Save</button>
          </form>
        </div>
      </div>
    )
  }
};