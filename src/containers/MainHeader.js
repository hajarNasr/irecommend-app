import React from 'react';
import { goToLoginPage, goToSignupPage } from '../helpers/HomeClickActions';
import '../css/main-header.css';

const MainHeader = (props)=>{
    return(
       <header className="main-header">
           <div className={props.brandClassName}
                onClick={props.onClick}>
               iRecommend
           </div>
           <div className="main-header__sign-btns">
                <button className={props.loginClass} id={props.loginId}
                        onClick={goToLoginPage}>
                        Login
                </button>
                <button className={props.signupClass} id={props.signupId}
                        onClick={goToSignupPage}>
                    Sign up
                </button>
            </div>
       </header>
    );
}

export default MainHeader;