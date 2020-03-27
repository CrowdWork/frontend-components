import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import Card from "./Card/Card";
import FormGroup from "./FormGroup/FormGroup";

const Landing = ({ isLoggedIn }) => {
  return (
    <>
      <div className="navigation">
        <input
          type="checkbox"
          className="navigation__checkbox"
          id="navi-toggle"
        />

        <label htmlFor="navi-toggle" className="navigation__button">
          <span className="navigation__icon">&nbsp;</span>
        </label>

        <div className="navigation__background">&nbsp;</div>

        <nav className="navigation__nav">
          <ul className="navigation__list">
            <li className="navigation__item">
              <Link to="/" className="navigation__link">
                <span>01</span>Home
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/legal-index" className="navigation__link">
                <span>02</span>Legal Index
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/frankinsense" className="navigation__link">
                <span>03</span>Frankinsense Classroom
              </Link>
            </li>
            <li className="navigation__item">
              <Link to="/settings" className="navigation__link">
                <span>04</span>Settings
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      <div className="hero">
        <div className="hero__logo-box">
          <img src="#" alt="Logo" className="hero__logo" />
        </div>
        <div className="hero__text-box">
          <h1 className="heading-primary">
            <span className="heading-primary--main">Barnor</span>
            <span className="heading-primary--sub">Law Engine</span>
          </h1>
          <a href="#" className="btn btn--white btn--animated">
            Get Started
          </a>
        </div>
      </div>

      <main>
        <section className="section-about">
          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">Services</h2>
          </div>

          <div className="row">
            <div className="col-2-of-4">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--1">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--1">
                      Legal Index
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-1">
                  <div className="card__cta">
                    {/* <div className="card__price-box">
                      <p className="card__price-only">Only</p>
                      <p className="card__price-value">$297</p>
                    </div> */}
                    <a href="#popup" className="btn btn--white">
                      Subscribe now!
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-2-of-4">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--2">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--2">
                      Frankinsense Classroom
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-2">
                  <div className="card__cta">
                    {/* <div className="card__price-box">
                      <p className="card__price-only">Only</p>
                      <p className="card__price-value">$497</p>
                    </div> */}
                    <a href="#popup" className="btn btn--white">
                      Subscribe now!
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="col-2-of-4">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--3">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--3">
                      Practical Practice
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-3">
                  <div className="card__cta">
                    {/* <div className="card__price-box">
                      <p className="card__price-only">Only</p>
                      <p className="card__price-value">$897</p>
                    </div> */}
                    <a href="#popup" className="btn btn--white">
                      Subscribe now!
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-2-of-4">
              <div className="card">
                <div className="card__side card__side--front">
                  <div className="card__picture card__picture--1">&nbsp;</div>
                  <h4 className="card__heading">
                    <span className="card__heading-span card__heading-span--1">
                      Legal Index
                    </span>
                  </h4>
                  <div className="card__details">
                    <ul>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                      <li>lorem ipsum stuff</li>
                    </ul>
                  </div>
                </div>
                <div className="card__side card__side--back card__side--back-1">
                  <div className="card__cta">
                    {/* <div className="card__price-box">
                      <p className="card__price-only">Only</p>
                      <p className="card__price-value">$297</p>
                    </div> */}
                    <a href="#popup" className="btn btn--white">
                      Subscribe now!
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="u-center-text u-margin-top-huge">
            <a href="#" className="btn btn--green">
              Learn More
            </a>
          </div>
        </section>

        <section className="section-features">
          <div className="row">
            <div className="col-1-of-3">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-compass" />
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Accessible Content
                </h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, ipsum sapiente aspernatur.
                </p>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-map" />
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Honest Service
                </h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, ipsum sapiente aspernatur.
                </p>
              </div>
            </div>

            <div className="col-1-of-3">
              <div className="feature-box">
                <i className="feature-box__icon icon-basic-heart" />
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Clear Information
                </h3>
                <p className="feature-box__text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, ipsum sapiente aspernatur.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section-tours" id="section-tours"></section>

        <section className="section-stories">
          <div className="bg-video">
            <video className="bg-video__content" autoPlay muted loop>
              <source src="img/video.mp4" type="video/mp4" />
              <source src="img/video.webm" type="video/webm" />
              Your browser is not supported!
            </video>
          </div>

          <div className="u-center-text u-margin-bottom-big">
            <h2 className="heading-secondary">Pupillage</h2>
          </div>

          <div className="row">
            <div className="story">
              <figure className="story__shape">
                <img
                  src="img/nat-8.jpg"
                  alt="Avatar here"
                  className="story__img"
                />
                <figcaption className="story__caption">Naa Barnor</figcaption>
              </figure>
              <div className="story__text">
                <h3 className="heading-tertiary u-margin-bottom-small">
                  Heading
                </h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aperiam, ipsum sapiente aspernatur libero repellat quis
                  consequatur ducimus quam nisi exercitationem omnis earum qui.
                  Aperiam, ipsum sapiente aspernatur libero repellat quis
                  consequatur ducimus quam nisi exercitationem omnis earum qui.
                </p>
              </div>
            </div>
          </div>

          <div className="u-center-text u-margin-top-huge">
            <a href="#" className="btn-text">
              Learn more &rarr;
            </a>
          </div>
        </section>

        <section className="section-book">
          <div className="row">
            <div className="book">
              <div className="book__form">
                <form className="form">
                  <div className="u-margin-bottom-medium">
                    <h2 className="heading-secondary">Contact Us!</h2>
                  </div>

                  <div className="form__group">
                    <input
                      type="text"
                      className="form__input"
                      placeholder="Full name"
                      id="name"
                      required
                    />
                    <label htmlFor="name" className="form__label">
                      Full name
                    </label>
                  </div>

                  <div className="form__group">
                    <input
                      type="email"
                      className="form__input"
                      placeholder="Email address"
                      id="email"
                      required
                    />
                    <label htmlFor="email" className="form__label">
                      Email address
                    </label>
                  </div>

                  <div className="form__group u-margin-bottom-medium">
                    <div className="form__radio-group">
                      <input
                        type="radio"
                        className="form__radio-input"
                        id="lawyer"
                        name="profession"
                      />
                      <label htmlFor="lawyer" className="form__radio-label">
                        <span className="form__radio-button"></span>
                        Practicing Lawyer
                      </label>
                    </div>

                    <div className="form__radio-group">
                      <input
                        type="radio"
                        className="form__radio-input"
                        id="other"
                        name="profession"
                      />
                      <label htmlFor="other" className="form__radio-label">
                        <span className="form__radio-button" />
                        Other
                      </label>
                    </div>
                  </div>

                  <div className="form__group">
                    <button className="btn btn--green">Next step &rarr;</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
};

// Change Section Markup below

// const Section = ({ children, title, className }) => {
//   return (
//       <section className={className}>
//         <div className="section-title">{title}</div>
//         <a class="waves-effect waves-light btn red disabled">Learn More</a>
//       </section>
//   )
// }
export default Landing;
