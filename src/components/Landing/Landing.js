import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Card from '../Card/Card'
import FormGroup from "../FormGroup/FormGroup"
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
        <div className="banner-overlay"></div>
          <div className="container height-100vh splash"> 
            <div className="row center">
              <div className="col s6">
                <h3 className="main-tagline">Accessible Content,</h3>
                <h3 className="main-tagline">Honest Service,</h3>
                <h3 className="main-tagline"> Clear Information</h3>
              </div>
              <div className="col s6">
                <Link to="/login" id="login-btn" className="btn-large btn-flat waves-effect z-depth-0 white" >Login</Link>
                <Link to="/signup" className="btn-large waves-effect waves-light lighten-1 z-depth-0">Signup</Link>
              </div>
            </div>
    
          </div>
        </div>
        <div className="landing--about-me">
          <div className="container">
            <div className="row section">
              <h3 >About Barnor Law Engine</h3>
              <p className="about-text flow-text">
                Barnor Law Engine was started in 2017 to provide clear and easily accessible information for lawyers looking to qualify in the Ghanaian jurisdiction. It aims to provide information on the academic and apprenticeship stages of becoming a qualified Barrister at Law and Solicitor of the Supreme Court of Ghana.
                Here you can find out about the entry requirements for the Post Call course offered by Ghana Law School, information on the structure of the Ghanaian Legal system, a handy online case index, and exclusive notes and exercises to help you pass the Post Call course.
                Barnor Law Engine is uniquely positioned to give real advice about what you really need to know to successfully pass the course, secure pupillage and keep abreast of legal news. Your journey is made easier with us by your side.
              </p>
            </div>
          </div>
        </div>
        
      <div className="section services">
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

          >
            <img src="/img/court-icon.png" class="icon"/>
            <div className="service-tagline">Coming Soon!</div>
          </Card>
        </div>
      </div>
        </div>
      </div>
      
      <section className="qualify">
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