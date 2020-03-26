import React, { Fragment, useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import FormGroup from "../FormGroup/FormGroup"
import LandingHeader from '../Header/LandingHeader'
import useMedia from "../../fx/useMedia"

const LandingA = ({ firstName, isLoggedIn, onLogout }) => {

  return (
    <>
    <LandingHeader
      isLoggedIn={isLoggedIn}
      onLogout={onLogout}
    />
    {/* <main style={{paddingLeft}}>
      <div className="section banner">
        <div className="banner-overlay"></div>
          <div className="container height-100vh splash"> 
            <div className="row center">
              <div className={"col" + (!isLoggedIn ? " s6" : "" )} > 
                <h3 className="main-tagline">Accessible Content,</h3>
                <h3 className="main-tagline">Honest Service,</h3>
                <h3 className="main-tagline"> Clear Information</h3>
              </div>
            { !isLoggedIn &&
              <div className="col s6 splash-buttons">
                <Link to="/login" id="login-btn" className="btn-large btn-flat waves-effect z-depth-0 white" style={{marginBottom}}>
                  Login
                </Link>
                <Link to="/signup" className="btn-large waves-effect waves-light lighten-1 z-depth-0">Signup</Link>
              </div>
            }
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
        
      <div id="services" className="services">
          <Card
            title="Legal Index"
            
            link="/legal-index"

          > 
            <img src="/img/index-icon.png" class="icon"/> 
            <div className="service-tagline"> An case index of all Ghanaian Law Reports in one place!</div>
          </Card>
          <Card
            title="Frankinsense Classroom"
           
            link="/frankinsense"
          >
            <img src="/img/man-reading-icon.png" class="icon"/>
            <div className="service-tagline">A learning hub for the Professional Bar Course
Featuring</div>
          </Card>
          <Card
            title="Practical Practice"
            
            link="https://barnorlawengine.wordpress.com/"
          >
            <img src="/img/blogging-icon.png" class="icon"/>
            <div className="service-tagline">Visit our Blog and gain access to articles on legal
practice and procedure and discussions of recent cases.</div>
          </Card>
          <Card
            title="Court Finder"
            
            link="/court-finder"
            disabled

          >
            <img src="/img/court-icon.png" class="icon"/>
            <div className="service-tagline">Coming Soon!</div>
          </Card>
      </div>
      
      <section id="qualify" className="qualify" style={{background: theme.mainColor}}>
        <div className="section-title">QUALIFYING AS A LAWYER IN GHANA</div>
        <div className="section-info"> Every applicant must have attended and graduated with a first degree in Law from a law school or schools. The applicant must have passed the bar or the solicitor’s course and be academically qualified to practice or currently practicing in their respective jurisdictions. The applicant cannot be disbarred, be under investigation or undergoing disciplinary proceedings from any legal regulatory body.
Applicants who qualified in the UK jurisdiction and obtained the GDL before going on to complete the BPTC or LPC are qualified to apply for the Post Call Course.
 </div> 
        <a 
          class="waves-effect waves-light btn red"
          href="http://gslaw.edu.gh/programmes/post-call-law- course/"
        >
          Learn More
        </a>

      </section>

      <section className="pup">
      <div className="section-title">Pulpillage</div>
        <a class="waves-effect waves-light btn red disabled">Learn More</a>
      </section>
      
      <div className="row section">
        <div className="container">
          <h4 className="center">Consultant</h4>
          <div className="divider"></div>
          <h5>Jane Lee Doe</h5>
          <p>
          Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. 
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
          <p>House ullamco laboris<br/>
          Ut enim ad minim veniam,<br/>
          aliquip ex ea commodo consequat. </p>
        </div>
        <div className="col s12 m4 center">
          <h5>Email Address</h5>
          <p>info@aliquipexea.com</p>
        </div>
        <div className="col s12 m4 center">
          <h5>Telephone</h5>
          <p>+555555555</p>
        </div>
        </div>
      </div>
      <div className="container">
        <div className="footer-copyright">
          <div className="container center">© Barnor Law Engine 2020</div>
        </div>
      </div>
    </main> */}
  </>
  )
}

// Change Section Markup below

const Section = ({ children, title, className }) => {
  return (
      <section className={className}>
        <div className="section-title">{title}</div>
        <a class="waves-effect waves-light btn red disabled">Learn More</a>
      </section>
  )
}
export default LandingA