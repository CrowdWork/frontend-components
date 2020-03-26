// import "./Header.css";
// import M from 'materialize-css'
import React, { Fragment, useRef, useLayoutEffect, useState } from "react";
import { Link, useLocation, Redirect, useHistory } from "react-router-dom";

// generator/pointer for isAtLanding?
const Header = ({ firstName, lastName, isLoggedIn, onLogout, title }) => {
  // const { pathname } = useLocation();
  // const history = useHistory();
  // const [activeSectionId, setActiveSectionId] = useState(null);

  // useLayoutEffect(() => {
  //   if (pathname == "/" && activeSectionId) {
  //     document
  //       .getElementById(activeSectionId)
  //       .scrollIntoView({ behavior: "smooth" });
  //   }
  // }, [activeSectionId, pathname]);

  // const dropdowns = document.querySelectorAll(".dropdown-trigger");
  // for (let i = 0; i < dropdowns.length; i++) {
  //   M.Dropdown.init(dropdowns[i], {
  //     coverTrigger: false,
  //     closeOnClick: false,
  //     alignment: "left",
  //     hover: false,
  //     constrainWidth: false
  //   });
  // }

  return (
    <header className="header">
      <nav className="header__nav">
        {/* <Link to="/" id="brand-logo" className="brand-logo"></Link> */}
        {isLoggedIn ? (
          <>
            <ul className="header__nav--list">
              <li className="header__nav--item">
                <Link to="/">Services</Link>
              </li>
              <li>
                <Link to="/">Contact Us</Link>
              </li>
              <li>
                <Link to="/" className="br">
                  Qualifying in Ghana
                </Link>
              </li>
            </ul>
          </>
        ) : (
          <ul className="header__nav--list">
            <li>
              <Link to="/">Services</Link>
            </li>
            <li>
              <Link to="/">Contact Us</Link>
            </li>
            <li>
              <Link to="/" className="br">
                Qualifying in Ghana
              </Link>
            </li>
            <li>
              <Link to="/signup">Signup Now!</Link>
            </li>
          </ul>
        )}
      </nav>
    </header>
  );
};

export default Header;

// const tabs = document.querySelectorAll('.tabs')
// for (let i = 0; i < tabs.length; i++){
//   M.Tabs.init(tabs[i], {});
// }
// const collapsibles = document.querySelectorAll('.collapsible')
// for (let i = 0; i < collapsibles.length; i++){
//   M.Collapsible.init(collapsibles[i]);
// }
// const featureDiscoveries = document.querySelectorAll('.tap-target')
// for (let i = 0; i < featureDiscoveries.length; i++){
//   M.FeatureDiscovery.init(featureDiscoveries[i]);
// }
// const chips = document.querySelectorAll('.chips')
// for (let i = 0; i < chips.length; i++){
//   M.Chips.init(chips[i])
// }
// const materialboxes = document.querySelectorAll('.materialboxed')
// for (let i = 0; i < materialboxes.length; i++){
//   M.Materialbox.init(materialboxes[i]);
// }
// const modals = document.querySelectorAll('.modal')
// for (let i = 0; i < modals.length; i++){
//   M.Modal.init(modals[i]);
// }
// const parallax = document.querySelectorAll('.parallax')
// for (let i = 0; i < parallax.length; i++){
//   M.Parallax.init(parallax[i]);
// }
// const scrollspies = document.querySelectorAll('.scrollspy')
// for (let i = 0; i < scrollspies.length; i++){
//   M.ScrollSpy.init(scrollspies[i]);
// }
// const tooltips = document.querySelectorAll('.tooltipped')
// for (let i = 0; i < tooltips.length; i++){
//   M.Tooltip.init(tooltips[i]);
// }
