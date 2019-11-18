import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import FormGroup from "../FormGroup/FormGroup"
import M from 'materialize-css'
import './Landing.css'
import theme from "../../theme"
import useMedia from "../../fx/useMedia"

document.addEventListener('DOMContentLoaded', function() {
  var elems = document.querySelectorAll('.parallax');
  M.Parallax.init(elems)
})



const Landing = (props) => {
  // margin bottom for login button
  const marginBottom = useMedia(["(max-width: 550px)"], ["2em"], 0)

  return (
    <Fragment>
      <div className="section banner">
        <div className="banner-overlay"></div>
          <div className="container height-100vh splash"> 
            <div className="row center">
              <div className="col s6"> 
                <h3 className="main-tagline">Accessible Content,</h3>
                <h3 className="main-tagline">Honest Service,</h3>
                <h3 className="main-tagline"> Clear Information</h3>
              </div>
              <div className="col s6 splash-buttons">
                <Link to="/login" id="login-btn" className="btn-large btn-flat waves-effect z-depth-0 white" style={{marginBottom}}>
                  Login
                </Link>
                <Link to="/signup" className="btn-large waves-effect waves-light lighten-1 z-depth-0">Signup</Link>
              </div>
            </div>
    
          </div>
        </div>
        <div id="about-me" className="landing--about-me" style={{background: theme.mainColor}}>
          <div className="container">
            <div className="row section section-about">
              <h3 >About Barnor Law Engine</h3>
              <p className="about-text flow-text" >
              BLE provides organized information to Ghanaian lawyers at the click of a button. 
              We empower legal practitioners with all the tools 
              they need for success by creating a platform for knowledge sharing within the legal community.
              <br/> Know-how, Know Now!
              </p>
            </div>
          </div>
        </div>
        
      <div id="services" className="section services">
        <div className="container">
        <div className="row">
        <div className="col s12 m6 row-inner">
          

          <Card
            title="Legal Index"
            
            link="/legal-index"

          > 
            <img src="/img/index-icon.png" class="icon"/> 
            <div className="service-tagline"> An case index of all Ghanaian Law Reports in one place!</div>
          </Card>
        </div>
        <div className="col s12 m6">
          

          <Card
            title="Frankinsense Classroom"
           
            link="/frankinsense"
          >
            <img src="/img/man-reading-icon.png" class="icon"/>
            <div className="service-tagline">A learning hub for the Professional Bar Course
Featuring</div>
          </Card>
        </div>
        <div className="col s12 m6">

    
          <Card
            title="Practical Practice"
            
            link="https://barnorlawengine.wordpress.com/"
            disabled
          >
            <img src="/img/blogging-icon.png" class="icon"/>
            <div className="service-tagline">Visit our Blog and gain access to articles on legal
practice and procedure and discussions of recent cases.</div>
          </Card>

        </div>
        <div className="col s12 m6">

          <Card
            title="Court Finder"
            
            link="/court-finder"
            disabled

          >
            <img src="/img/court-icon.png" class="icon"/>
            <div className="service-tagline">Coming Soon!</div>
          </Card>
        </div>
      </div>
        </div>
      </div>
      
      <section id="qualify" className="qualify" style={{background: theme.mainColor}}>
        <div className="section-title">QUALIFYING AS A LAWYER IN GHANA</div>
        <a class="waves-effect waves-light btn red disabled">Learn More</a>

      </section>

      <section className="pup">
      <div className="section-title">Pulpillage</div>
        <a class="waves-effect waves-light btn red disabled">Learn More</a>
      </section>
      
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
          <FormGroup />
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