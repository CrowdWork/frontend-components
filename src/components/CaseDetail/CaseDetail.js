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
    console.log('componentDidMount')
    return this.fetchCase()
   
  }

  fetchCase = async () => {
    try {
      const getCase = await axios.get(`${url}/cases/detail/${this.props.match.params.mongo_id}`)
      const fetchedCase = getCase.data[0]
      for (const prop in fetchedCase) {
        if (Array.isArray(fetchedCase[prop])) {
          fetchedCase[prop] = fetchedCase[prop].join().split(',')
        }
      }
      this.setState({ 
        courtCase: fetchedCase,
        isFavorite: fetchedCase.favorite
      })
    } catch (err) {
      console.log(err)
    }
  }
  
  onToggleFavorite = async () => {
    if (this.state.isFavorite === true) {
      this.setState({ isFavorite: false })
      const toastHTML = '<span>Case removed from your favorites!</span><button class="btn-flat toast-action">View Favorites</button>'
      M.toast({html: toastHTML})
      try {
        const updateCase = await axios.patch(`${url}/cases/detail/${this.props.match.params.mongo_id}`, {
          favorite: false
        })
        if (updateCase) this.fetchCase()
      } catch (err) {
        console.log(err)
      }
      
    } else {
        this.setState({ isFavorite: true })
        const toastHTML = '<span>Case added to your favorites!</span><button class="btn-flat toast-action">View Favorites</button>'
        M.toast({html: toastHTML})
        try {
          await axios.patch(`${url}/cases/detail/${this.props.match.params.mongo_id}`, {
            favorite: true
          })
        } catch (err) {
          console.log(err)
        }
      }
    }

    renderJudges() {
      const { courtCase } = this.state
      if (courtCase) {
        return courtCase.judges.map(judge => <li key={courtCase.judges.indexOf(judge)}>{judge}</li>)
      }
    }

    renderKeywords() {
      const { courtCase } = this.state
      if (courtCase) {
        return courtCase.keyWords.map(keyWord => <li key={courtCase.keyWords.indexOf(keyWord)}>{keyWord}</li>)
      }
    }

  render() {
    return (
      <div id="CaseDetail-container" className="row">
        <div id="card-panel-wrapper" className="col s12 m5">
          <a className="btn" onClick={this.props.history.goBack}><i id="navBack" className="material-icons">arrow_back</i> Back to results</a>
          
          <div className="flex-space-btw">
          <h5>{this.state.courtCase.caseName}</h5>
            <i id="favorite-icon" className="material-icons" onClick={this.onToggleFavorite}>{this.state.isFavorite ? 'favorite' : 'favorite_border'}</i>
          </div>
            
          <div className="card-panel white">
            
            
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
                  <td>{this.renderJudges()}</td>
                </tr>
                <tr>
                  <th>Keyword(s)</th>
                  <td>{this.renderKeywords()}</td>
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
