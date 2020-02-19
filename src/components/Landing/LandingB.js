import React, { useState } from "react";
import { Link } from 'react-router-dom'
import styled from "styled-components";
import useMedia from "../../fx/useMedia"
import './Landing.css'

export default ({ isLoggedIn }) => {
  const screenSize = useMedia(["(max-width: 1000px"], ["MOBILE"], "DESKTOP")
  
  const paddingLeft = isLoggedIn && screenSize === "DESKTOP"
    ? `230px`
    : ``

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  const handleChange = e => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();
    // axios.post(url, {body: form})
  };

  return (
    <Container style={{paddingLeft}}>
      {
        !isLoggedIn && <Splash>
        <SplashTagline>
          <h3> Accessible Content,</h3>
          <h3> Honest Service,</h3>
          <h3> Clear Information</h3>
        </SplashTagline>
        <SplashInfo>
            <p>
              BLE provides organized information to Ghanaian lawyers at the click
              of a button. We empower legal practitioners with all the tools they
              need for success by creating a platform for knowledge sharing within
              the legal community. 
           
            <span>Know-how, Know Now!</span>
            </p>
            <ButtonGroup>
            <Button>
                <Link to="/login">
                  Login
                </Link>
            </Button>
            <Button>Sign Up</Button>
          </ButtonGroup>
            {/* <Button>Services</Button> */}
          
          { screenSize === "DESKTOP" &&
            <img src="https://images.unsplash.com/photo-1518674660708-0e2c0473e68e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80" />
          }
        </SplashInfo>
      </Splash> 
      }
      <Services id="services">
        <div>
          <h3>Legal Index</h3>
          <img src="/img/index-icon.png" class="icon"/>
          <p>An case index of all Ghanaian Law Reports in one place!</p>
          <Button>
            <Link to="/legal-index">
              Learn More
            </Link>
          </Button>
          <Overlay />
        </div>
        <div>
          <h3>Frankinsense Classroom</h3>
          <img src="/img/man-reading-icon.png" class="icon"/>
          <p>A learning hub for the Professional Bar Course Featuring</p>
          <Button>
            <Link to="/frankinsense">
              Learn More
            </Link>
          </Button>
          <Overlay />
        </div>
        <div>
          <h3>Practical Practice</h3>
          <img src="/img/blogging-icon.png" class="icon"/>
          <p>
            Visit our Blog and gain access to articles on legal practice and
            procedure and discussions of recent cases.{" "}
          </p>
          <Button>
            <a href="https://barnorlawengine.wordpress.com/">
              Learn More
            </a>
          </Button>
          <Overlay />
        </div>
        <div>
          <h3>Court Finder</h3>
          <img src="/img/court-icon.png" class="icon"/>
          <p>Coming Soon!</p>
          <Button>Learn More</Button>
          <Overlay />
        </div>
      </Services>
      <LandingSection id="qualify">
        <div>
          Every applicant must have attended and graduated with a first degree
          in Law from a law school or schools. The applicant must have passed
          the bar or the solicitor’s course and be academically qualified to
          practice or currently practicing in their respective jurisdictions.
          The applicant cannot be disbarred, be under investigation or
          undergoing disciplinary proceedings from any legal regulatory body.
          Applicants who qualified in the UK jurisdiction and obtained the GDL
          before going on to complete the BPTC or LPC are qualified to apply for
          the Post Call Course
        </div>
        <div>
          <h3>QUALIFYING AS A LAWYER IN GHANA</h3>
          <img />
          <Button>Learn More</Button>
        </div>
      </LandingSection>
      <LandingSection>
        <div>
          <img />
          <h3>Pulpillage</h3>
          <Button>Learn More</Button>
        </div>
        <div>
          Lorem ipsum dolor amet synth before they sold out mustache kombucha
          neutra beard. Roof party +1 jianbing schlitz literally lyft. Pickled
          lomo freegan meditation deep v mixtape artisan portland subway tile
          hella letterpress woke asymmetrical stumptown sustainable.
        </div>
      </LandingSection>
      <Contact id="contact">
        <h3>Contact Us</h3>
        <form onChange={handleChange} onSubmit={handleSubmit}>
          <input name="name" type="text" placeholder="Name"/>
          <input name="email" type="text" placeholder="Email" />
          <input name="phone" type="text" placeholder="Phone Number"/>
          <input name="message" type="text" placeholder="Subject" />
          <Button type="submit">Submit</Button>
        </form>
      </Contact>
      <Footer>
        <div>
          <h3>Office Location</h3>
          House ullamco laboris Ut enim ad minim veniam, aliquip ex ea commodo
          consequat.
        </div>
        <div>
          <h3>Email Address</h3>
          info@aliquipexea.com
        </div>
        <div>
          <h3>Telephone</h3>
          +555555555
        </div>
      </Footer>
    </Container>
  );
}

/////////////////////////////
const Container = styled.div`
  font-family: sans-serif;
  text-align: center;
  scroll-snap-type: y mandatory;
  overflow-y: scroll;
  overflow-x: hidden;
  display: flex;
  flex-direction: column;
  place-items: center center;
  font-family: "Open Sans";
  width: 100vw;
  height: 100vh;
  position: relative;
  border: 1px solid black;
  & > * {
    scroll-snap-align: end;
    width: 99% !important;
    background: #f9f8f8;
  }
`;

////////////////////////////
const Splash = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 7em;
`;

const SplashInfo = styled.div`
  display: grid;
  grid-template-columns: minmax(20%, .5fr);
  grid-template-rows: 1fr;
  place-items: start center;
  padding: 2em;
  position: relative;
  min-height: 67vh;
  background: #f9f8f8 !important;
  font-size: 32px;
  line-height: 60px;
  img {
    height: 110%;
    width: 50%;
    position: absolute;
    right: -5%;
    top: -20%;
    border-radius: 50% 0 0 50%;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    z-index: 50;
  }

  div {
    width: 65%;
    line-height: 36px;
    padding: 1em;
    font-size: 18px;
    flex: 1;
    display: flex;
    flex-direction: column;
    place-items: center;
    position: relative;
    & > * {
      margin: 1em;
    }
  }
  span {
  }
  & > button {
    height: 2em;
    place-self center end;
  }
`;

const SplashTagline = styled.div`
  display: flex;
  justify-content: center;
  font-size: 28px;
  font-family: "Cinzel";
  z-index: 99;
  background: transparent;
  & > * {
    margin: 0.5em;
  }
`;

////////////////////////////////
const Services = styled.div`
  padding: 5em 6.5em;
  display: grid;
  grid-gap: 4em;
  justify-content: center;
  align-items: center;
  grid-template-columns: repeat(auto-fill, minmax(25em, 1fr));
  grid-template-rows: 1fr;
  position: relative;
  scroll-snap-align: start !important;
  & > div {
    display: flex;
    flex-direction: column;
    place-content: center space-between;
    padding: 1em;
    height: 27em;

    color: black;
    position: relative;
    overflow: hidden;
    box-shadow: 0 19px 38px rgba(0, 0, 0, 0.3), 0 15px 12px rgba(0, 0, 0, 0.22);
    border-radius: 16px;
    & > * {
      margin: 1em 0;
      z-index: 99;
    }
    img {
     
    }
    button {
      place-self: center center;
    }
    h3 {
      font-size: 32px;
    }
    p {
      margin-top: 7em;
    }
  }
`;

//////////////////////////////
const LandingSection = styled.section`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(35em, 1fr));
  padding: 1em 6em;
  margin-bottom: 2em;

  min-height: max-content;
  & > * {
    padding: 1em;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    line-height: 32px;
  }
`;

////////////////////////////
const Contact = styled.div`
  margin-bottom: 2em;
  padding-top: 2em;
  h3 {
  }

  form {
    display: grid;
    grid-template-columns: 20em 20em;
    grid-template-rows: 4em 4em;
    place-content center center;
    grid-gap: 3em;
    button { 
      justify-self: center;
      transform: translatex(7em)
    }
  }
`;
///////////////////////////

const Footer = styled.footer`
  display: flex;
  & > * {
    flex: 1;
  }
`;
/////////////////////////////

const Button = styled.button`
  cursor: pointer;
  height: min-content;
  min-width: max-content;
  width: 8em;
  padding: 0.75em;
  font-size: 18px;
  background: #1d976c; /* fallback for old browsers */
  background: -webkit-linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(
    to right,
    #93f9b9,
    #1d976c
  ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  letter-spacing: 2px;
  outline: none;
  border-radius: 24px;
  border: none;
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: row !important;
  width: max-content;
  justify-content: center;
  place-self: end center;
  margin-top: 1em;
`;

const Overlay = styled.div`
  background: transparent; /* linear-gradient(
    180deg,
    rgba(74, 81, 48, 1) 50%,
    rgba(0, 212, 255, 0) 100%
  );*/
  position: absolute;
  height: 110%;
  width: 100%;
  top: -10%;
  left: 0;
  z-index: 95 !important;
  opacity: 0.9;
`;

const Form = ({ name, type}) => {
  
  const Container = styled.div`
    position: relative;
    input {
      font-size:18px;
      padding:10px 10px 10px 5px;
      display:block;
      width:300px;
      border:none;
      border-bottom:1px solid #757575;
      &:focus {
        outline: none;
      }
      label 				 {
        color:#999; 
        font-size:18px;
        font-weight:normal;
        position:absolute;
        pointer-events:none;
        left:5px;
        top:10px;
        transition:0.2s ease all; 
        -moz-transition:0.2s ease all; 
        -webkit-transition:0.2s ease all;
      }

      input:focus ~ label, input:valid ~ label 		{
        top:-20px;
        font-size:14px;
        color:#5264AE;
      }
      .bar 	{ position:relative; display:block; width:300px; }
.bar:before, .bar:after 	{
  content:'';
  height:2px; 
  width:0;
  bottom:1px; 
  position:absolute;
  background:#5264AE; 
  transition:0.2s ease all; 
  -moz-transition:0.2s ease all; 
  -webkit-transition:0.2s ease all;
}
.bar:before {
  left:50%;
}
.bar:after {
  right:50%; 
}

/* active state */
input:focus ~ .bar:before, input:focus ~ .bar:after {
  width:50%;
}

/* HIGHLIGHTER ================================== */
.highlight {
  position:absolute;
  height:60%; 
  width:100px; 
  top:25%; 
  left:0;
  pointer-events:none;
  opacity:0.5;
}

/* active state */
input:focus ~ .highlight {
  -webkit-animation:inputHighlighter 0.3s ease;
  -moz-animation:inputHighlighter 0.3s ease;
  animation:inputHighlighter 0.3s ease;
}

/* ANIMATIONS ================ */
@-webkit-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@-moz-keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
@keyframes inputHighlighter {
	from { background:#5264AE; }
  to 	{ width:0; background:transparent; }
}
    }
`

  return  <Container>
            <input type={type || "text"} required />
            <span class="highlight"></span>
            <span class="bar"></span>
            <label>{name}</label>
          </Container>
}