import React from 'react';
import FormField from './FormField';
import SubmitBtn from './SubmitBtn';
import MainHeader from '../containers/MainHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ResetPasswordAction } from '../store/actions/authActions';
import '../css/reset-password.css';

const ResetPassword = (props)=>{
    const handleResetPassword = (e)=>{
        e.preventDefault();
        const email = e.target.elements['reset-password'].value;
        props.onResetPassword(email, props.history);
    }
    const goToHomePage = ()=>{
        props.history.push("/");
    }
    return (
        <div className="reset-password-wrapper">
            <MainHeader signupClass="display-none" 
                        loginClass="display-none"
                        onClick = {goToHomePage}
                        brandClassName="main-header__brand brand4"    
                        />
            <form onSubmit={handleResetPassword} className="reset-password-form">
                <h5>ENTER YOUR EMAIL TO RESET PASSWORD</h5>
                <FormField 
                    type="email"
                    name = "reset-password"
                    palceholder = "Enter your Email"
                    label = "Email"
                    className = "reset-password-email"
                />
                <SubmitBtn
                    type = "submit"
                    btnText = "Submit"
                    className="reset-password-submit-btn"
                /> 
        </form>
        </div>
    );
}

const mapDispatchToProps = dispatch =>{
    return {
        onResetPassword: (email, history) => dispatch(ResetPasswordAction(email, history)),
    }
}
export default withRouter(connect(null, mapDispatchToProps)(ResetPassword));