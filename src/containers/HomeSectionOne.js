import React from 'react';
import MainHeader from './MainHeader';
import Footer from '../components/Footer';
import SVGWave from '../components/SVGWave';
import { goToSignupPage, goToHomeSectionOne } from '../helpers/HomeClickActions';
import '../css/home-sections.css';
import '../css/home-section-one.css';

const HomeSectionOne = (props)=>{
    return(
        <div className={`home-section home-section-1 ${props.sectionActiveClass}`} 
             sectiondata="1"
             id={props.id}>
              <MainHeader signupClass="display-none" 
                         loginClass="login-btn-1" 
                         onClick = {goToHomeSectionOne}
                         brandClassName="main-header__brand brand1"/>
                
             <div className="home-section-1__content">
                <div className="home-section-1__content--words">
                      <h1>Recommend what you love to the world!</h1>
                      <p>Share your good experiences with everyone.</p>
                </div>
                
                <button className="home-section-1__content--join-us"
                        onClick = {goToSignupPage}>
                        Join us
                </button>
             </div> 

             <div>
             <SVGWave/>
             <Footer className="main-footer"/>
             </div>
        </div>
    );
}

export default HomeSectionOne;