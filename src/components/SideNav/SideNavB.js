import React, {useState, useEffect} from "react";
import styled from "styled-components"
import { motion, useInvertedScale, useViewportScroll } from "framer-motion";
import { Link, NavLink } from 'react-router-dom'
import useMedia from "../../fx/useMedia"

import { heavyColor, 
        deepShadow,
        shadow, 
        easeOutCubic, 
        lightColor 
    } from "../../theme"
//import { FaBars } from "react-icons/fa";
import animateMobileNav from "./_animations";

export default ({ 
    children, 
    firstName, 
    lastName, 
    email, 
    isLoggedIn, 
    onLogout, 
    admin 
}) => {
  const [navIsOpen, setOpen] = useState(false)
  const screenSize = useMedia(["(max-width: 1000px"], ["MOBILE"], "DESKTOP")
  const forceNavOpen = isLoggedIn && screenSize === "DESKTOP"
    ? true
    : false

  useEffect(() => {
    console.log(screenSize)
  }, [screenSize])

  return (
    <>
      { screenSize === "MOBILE" && 
          <NavBtn onClick={() => setOpen(!navIsOpen)}>
            <i className="material-icons">menu</i>
          </NavBtn>
      }
      <Nav {...animateMobileNav(forceNavOpen || navIsOpen)}>
        { isLoggedIn && 
          <>
            <div>
              Welcome! {firstName} {lastName}
            </div>
            <div>
              {email}
            </div> 
          </>
        }
        <hr />
        { isLoggedIn ?
            <>
              <NavLink to="/account">Account <i className="material-icons">account_circle</i></NavLink>
              <Link to="/" onClick={onLogout}>Logout <i className="material-icons">power_settings_new</i></Link>
              <hr />

              <Dropdown>
                <div>Admin</div>
              </Dropdown> {/* IMPLEMENT DROPDOWN */}
              <hr />
            </>
          : <>
              <Link to="/signup">Signup Now! <i className="material-icons">account_circle</i></Link>
              <Link to="/login">Sign In</Link>
              <hr />
            </>
        }

        {isLoggedIn ? (
          <>
            <Link to="/legal-index">Legal Index <i className="material-icons">search</i></Link>
            <Link to="/frankinsense">Frankensense Classroom <i className="material-icons">school</i></Link>
            <a href="#" className="tooltipped" data-tooltip="Coming Soon!">Court Finder <i className="material-icons">map</i></a>
            <a href="#" className="tooltipped"  data-tooltip="Coming Soon!">Practical Practice <i className="material-icons">work</i></a>
          </>
          ) : (
            <>
              <Link to="#" className="black-text">About</Link>
              <Link to="#" className="black-text">Services</Link>
              <Link to="#" className="black-text">Qualifying in Ghana</Link>
            </>
          )
        }
      </Nav>
    </>
  );
};

const Nav = styled(motion.nav)`
    height: calc(100vh + 5em);
    display: flex;
    flex-direction: column;
    position: fixed;
    left: 0;
    top: 0;
    width: 17em;
    background: #e8e8e8;
    z-index: 100;
    box-shadow: ${deepShadow};
    padding: 0 1em;
    padding-top: 5em;
    transform-origin: left;
    text-align: left;
    overflow: scroll;
    color: #54423A !important;
    hr {
      width: 100%;
    }
    & > * {
      color: #54423A !important;
      line-height: 22px;
    }
    div {
      transition: background-color 600ms ${easeOutCubic};
      width: max-content;

      &:hover {
        cursor: pointer;
        // background: ${lightColor};
        a {
          // color: ${heavyColor};
        }
      }
    }
    div > a {
      text-decoration: none;
      color: #54423A;
      font-size: 18px;
    }
  
`
const NavBtn = styled.button`
    position: fixed;
    left: 0;
    top: 0;
    margin: 2em;
    padding: 1em;
    border-radius: 50%;
    cursor: pointer;
    color: #54423A;
    box-shadow: ${shadow};
    border: none;
    z-index: 999;
    transition: all 600ms ${easeOutCubic};
    &:hover {
        transform: translateY(-.5em);
        box-shadow: ${deepShadow};
    }
    background: linear-gradient(
      to right,
      #93f9b9,
      #1d976c
    );
`

const Dropdown = styled.div`
    display: flex;
    flex-direction: column;

`
