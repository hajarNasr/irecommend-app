import React from 'react';
import MainHeader from '../containers/MainHeader';
import { withRouter } from 'react-router-dom';
import '../css/reset-password.css';

const PasswordResetEmailSent = (props)=>{
      const goToHomePage = ()=>{
         props.history.push("/");
      }
      return(
         <div className="reset-password-email-sent-wrapper">
            <MainHeader signupClass="display-none" 
                  loginClass="display-none"
                  onClick = {goToHomePage}
                  brandClassName="main-header__brand brand4"    
                  />
            <div className="email-was-sent">
                <p>An email was a link was sent to your email addresss. Please, 
                   follow the link to reset password.
                   </p>
                   <p>Thank you</p>
             </div>
         </div>
      );
}

export default withRouter(PasswordResetEmailSent);