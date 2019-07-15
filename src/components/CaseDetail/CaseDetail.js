import './CaseDetail.css'
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

class CaseDetail extends Component {
  state = {
    courtCase: ''
  }

  async componentDidMount() {
    try {
      const getCourtCase = await axios.get(`${url}/cases/detail/${this.props.match.params.mongo_id}`)
      this.setState({ courtCase: getCourtCase.data[0] })
      console.log(getCourtCase)
    } catch (err) {
      console.log(err)
    }
  }
  
  render() {
    
    return (
      <div id="CaseDetail-container" className="row">
        <div id="card-panel-wrapper" className="col s12 m5">
          <a className="btn" onClick={this.props.history.goBack}><i id="navBack" className="material-icons">arrow_back</i> Back to results</a>
          
          <div className="flex-space-btw">
            <h4>Case Details</h4>
            <i id="favorite-icon" className="material-icons">favorite_border</i>
          </div>
            
          <div className="card-panel white">
            
            <h5>{this.state.courtCase.caseName}</h5>
            <table className="bordered">
              <tbody>
                <tr>
                  <th>Citation</th>
                  <td>{this.state.courtCase.citation}</td>
                </tr>
                <tr>
                  <th>Court</th>
                  <td>{this.state.courtCase.court}</td>
                </tr>
                <tr>
                  <th>Type of Document</th>
                  <td>{this.state.courtCase.documentType}</td>
                </tr>
                <tr>
                  <th>Judge(s)</th>
                  <td>{this.state.courtCase.judges}</td>
                </tr>
                <tr>
                  <th>Keyword(s)</th>
                  <td>{this.state.courtCase.keyWords}</td>
                </tr>
                <tr>
                  <th>Summary</th>
                  <td>{this.state.courtCase.summary}</td>
                </tr>
                <tr>
                  <th>Cases Referred To</th>
                  <td>Coming Soon!</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }
  
}

export default CaseDetail
