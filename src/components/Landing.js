import React, { Fragment, useRef } from 'react'
import { Link } from 'react-router-dom'
import Card from './Card/Card'
import FormGroup from "./FormGroup/FormGroup"

const Landing = ({ isLoggedIn }) => {

  return (
    <>
    <header className="hero">
      <div className="hero__logo-box">
        <img src="./img/logo-white.png" alt="Logo" className="hero__logo" />
      </div>
      <div className="hero__text-box">
        <h1 className="heading-primary">
          <span className="heading-primary--main">Barnor Law Engine</span>
          <span className="heading-primary--sub">Accessible Content</span>
          <span className="heading-primary--sub">Honest Service</span>
          <span className="heading-primary--sub">Clear Information</span>
        </h1>
        <a href="#" className="btn btn--white btn--animated">Discover our tours</a>
      </div>
    </header>
    
    <main>
      <section class="section-about">
        <div class="u-center-text u-margin-bottom-big">
          <h2 class="heading-secondary">
            Exciting tours for adventurous people
          </h2>
        </div>

            <div class="row">
              <div class="col-1-of-2">
                <h3 class="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                <p class="paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nisi perspiciatis suscipit qui ullam id eveniet eaque quae. Vitae cumque ratione numquam provident expedita quaerat ipsam dolore debitis sunt nemo?
                </p>

                <h3 class="heading-tertiary u-margin-bottom-small">You're going to fall in love with nature</h3>
                <p class="paragraph">
                  Lorem ipsum dolor sit amet consectetur, adipisicing elit. Corporis nisi perspiciatis suscipit qui ullam id eveniet eaque quae. Vitae cumque ratione numquam provident expedita quaerat ipsam dolore debitis sunt nemo?
                </p>

                <a href="#" class="btn-text">Learn more &rarr;</a>
              </div>
              <div class="col-1-of-2">
                <div class="composition">
                  <img src="/Users/michaelbell/crowdwork/barnor-law-engine/ble-frontend/src/img/nat-1-large.jpg" alt="Photo 1" class="composition__photo composition__photo--p1" />
                  <img src="../img/nat-2-large.jpg" alt="Photo 2" class="composition__photo composition__photo--p2" />
                  <img src="img/nat-3-large.jpg" alt="Photo 3" class="composition__photo composition__photo--p3" />
                </div>
              </div>
            </div>

          </section>
    </main>
    </>
  )
}

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