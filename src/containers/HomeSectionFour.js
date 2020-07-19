import React from 'react';
import MainHeader from './MainHeader';
import SignupForm from '../components/SignupForm';
import  { goToHomeSectionOne } from '../helpers/HomeClickActions';
import LoginForm from '../components/LoginForm';
import Footer from '../components/Footer';
import '../css/home-sections.css';
import '../css/home-section-four.css';

const HomeSectionFour =(props)=>{
    return(
        <div className="home-section" sectiondata="4" id={props.id}>
            <MainHeader signupClass="signup-btn-4 display-none" 
                        signupId = "signup-btn-4-id"
                        loginClass="login-btn-1"
                        loginId = "login-btn-4-id"
                        onClick = {goToHomeSectionOne}
                        brandClassName="main-header__brand brand4"    
                        />
             <SignupForm/>  
             <LoginForm/>
             <Footer className="main-footer"/>
        </div>
    );
}

export default HomeSectionFour;




