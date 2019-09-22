import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import M from 'materialize-css'
import './Landing.css'

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  M.Parallax.init(elems)
})

const Landing = (props) => {
  return (
    <Fragment>
        <div className="section banner">
          <div className="container height-100vh display-flex flex-column flex-just-start"> 
            <h1 className="header center black-text">Barnor Law Engine</h1>
            <div className="row center">
              <div className="col s12">
                <h5 className="header light black-text">Accessible Content. Clear Information. Honest Service.</h5>
              </div>
            </div>
            <div className="row center">
              <Link to="/login" id="login-btn" className="btn-large btn-flat waves-effect z-depth-0 col s3 offset-s3">Login</Link>
              <Link to="/signup" className="btn-large waves-effect waves-light lighten-1 z-depth-0 col s3">Signup</Link>
            </div>          
          </div>
        </div>
      <div className="section">
        <div className="container">
        <div className="row">
        <div className="col s12 m6">
          <Card
            title="Legal Index"
            src="/img/janko-ferlic-specialdaddy-sfL_QOnmy00-unsplash.jpg"
            link="/legal-index"
          />
        </div>
        <div className="col s12 m6">
          <Card
            title="Frankinsense Classroom"
            src="/img/janko-ferlic-specialdaddy-sfL_QOnmy00-unsplash.jpg"
            link="/frankinsense"
          />
        </div>
        <div className="col s12 m6">
          <Card
            title="Practical Practice"
            src="/img/janko-ferlic-specialdaddy-sfL_QOnmy00-unsplash.jpg"
            link="/practical-practice"
          />
        </div>
        <div className="col s12 m6">
          <Card
            title="Court Finder"
            src="/img/janko-ferlic-specialdaddy-sfL_QOnmy00-unsplash.jpg"
            link="/court-finder"
          />
        </div>
      </div>
        </div>
      </div>
      
      <div className="row section">
        <div className="container">
          <h4 className="center">About Barnor Law Engine</h4>
          <p>
            Barnor Law Engine was started in 2017 to provide clear and easily accessible information for lawyers looking to qualify in the Ghanaian jurisdiction. It aims to provide information on the academic and apprenticeship stages of becoming a qualified Barrister at Law and Solicitor of the Supreme Court of Ghana.
            Here you can find out about the entry requirements for the Post Call course offered by Ghana Law School, information on the structure of the Ghanaian Legal system, a handy online case index, and exclusive notes and exercises to help you pass the Post Call course.
            Barnor Law Engine is uniquely positioned to give real advice about what you really need to know to successfully pass the course, secure pupillage and keep abreast of legal news. Your journey is made easier with us by your side.
          </p>
        </div>
      </div>
      <div className="row section">
        <div className="container">
          <h4 className="center">Consultant</h4>
          <div className="divider"></div>
          <h5>Naa Amakuma Barnor</h5>
          <p>
          After finishing her secondary education in Ghana, Naa progressed to the United Kingdom and obtained an LLB degree from Keele University and an LLM from SOAS University of London. She completed the Bar Professional Training Course (BPTC) at City University London and was called to the the UK Bar as a member of Inner Temple in 2015. In 2017 Naa was called as a barrister and solicitor of the Supreme Court of Ghana.
          </p>
        </div>
        
      </div>
      <div className="row section">
        <div className="container">
        <h4 className="center">Contact Us</h4>
        <div className="divider"/>

        <div className="col s12 m4 center">
          <h5>Office Location</h5>
          <p>House No F543/1<br/>
              Angola Road, Osu Kuku Hill<br/>  
              Opposite SSNIT Specialist Hospital</p>
        </div>
        <div className="col s12 m4 center">
          <h5>Email Address</h5>
          <p>info@barnorlawengine.com</p>
        </div>
        <div className="col s12 m4 center">
          <h5>Telephone</h5>
          <p>+233 505727250</p>
        </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-copyright">
          <div className="container center">© Barnor Law Engine 2019</div>
        </div>
      </div>
    </Fragment>
    
      
  )
}
export default Landing