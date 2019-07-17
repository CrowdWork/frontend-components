import './CaseDetail.css'
import M from 'materialize-css'
import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

class CaseDetail extends Component {
  state = {
    courtCase: '',
    isFavorite: false
  }

  componentDidMount() {
    axios.get(`${url}/cases/detail/${this.props.match.params.mongo_id}`)
    .then(res => {
      this.setState({ 
        courtCase: res.data[0],
        isFavorite: res.data[0].favorite
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
  componentDidUpdate() {
    console.log(this.state.isFavorite)
    axios.patch(`${url}/cases/detail/${this.props.match.params.mongo_id}`, {
      favorite: this.state.isFavorite
    })
  }
  
  onToggleFavorite = async () => {
    if (this.state.isFavorite) {
      this.setState({ isFavorite: false })
      M.toast({html: 'Case removed from your favorites!'})
     } else {
      this.setState({ isFavorite: true })
      M.toast({html: 'Case saved to your favorites!'})
    }
  }
  
  render() {
    console.log(this.state.isFavorite)
    return (
      <div id="CaseDetail-container" className="row">
        <div id="card-panel-wrapper" className="col s12 m5">
          <a className="btn" onClick={this.props.history.goBack}><i id="navBack" className="material-icons">arrow_back</i> Back to results</a>
          
          <div className="flex-space-btw">
            <h4>Case Details</h4>
            <i id="favorite-icon" className="material-icons" onClick={this.onToggleFavorite}>{this.state.isFavorite ? 'favorite' : 'favorite_border'}</i>
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
