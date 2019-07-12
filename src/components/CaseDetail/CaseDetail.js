import './CaseDetail.css'
import React from 'react'
import axios from 'axios'

const url = "http://localhost:4000"
// const url = "https://ble-backend.herokuapp.com"

const CaseDetail = async (props) => {
  console.log(props)
  try {
    const courtCase = await axios.get(`${url}/cases/${props.match.params.case_id}`)
  } catch (err) {
    console.log(err)
  }
  

  return (
    <div className="row">
      <div id="card-panel-wrapper" className="col s12 m5">
        <div className="card-panel white">
          <h4>Case Detail</h4>
        </div>
      </div>
    </div>
  )
}

export default CaseDetail
