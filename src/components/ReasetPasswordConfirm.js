import React from 'react';
import SubmitBtn from './SubmitBtn';
import FormField from './FormField';
import MainHeader from '../containers/MainHeader';
import { withRouter } from 'react-router-dom';
import { ResetPasswordConfirm } from '../store/actions/authActions';
import { connect } from 'react-redux';

const ReasetPasswordConfirm = (props)=>{
    const handelResetPasswordConfirmSubmit = (e) =>{
        e.preventDefault();
        let password1 = e.target.elements.new_password1.value;
        let password2 = e.target.elements.new_password2.value;
        props.onResetPasswordConfirm(password1, password2, props);
    }
    const goToHomePage = ()=>{
        props.history.push("/");
    }
    return(
        <div className="reset-password-confirm-wrapper">
            <MainHeader signupClass="display-none" 
                loginClass="display-none"
                onClick = {goToHomePage}
                brandClassName="main-header__brand brand4"    
            />
            <form onSubmit={handelResetPasswordConfirmSubmit} className="reset-password-confirm-form">
                <h3>Reset Password</h3>
                <FormField 
                    type="password"
                    name = "new_password1"
                    palceholder = "Enter new password"
                    label = "New Password"
                    errorMsgs = {props.passwordConfirmErrors}
                />
                <FormField 
                    type="password"
                    name = "new_password2"
                    palceholder = "Confirm password"
                    label = "Confirm Password"
                    errorMsgs = {props.passwordConfirmErrors}
                />
                <SubmitBtn
                    type = "submit"
                    btnText = "Submit"
                    className="reset-password-confirm-submit-btn"
                /> 
            </form>
        </div>
    );
}

export const mapStateToProps = state =>({
    passwordConfirmErrors: state.resetPasswordConfirmErrors,
});

const mapDispatchToProps = dispatch =>{
    return {
        onResetPasswordConfirm: (password1, password2, props)=> dispatch(ResetPasswordConfirm(password1, password2, props)),
    }
  }
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ReasetPasswordConfirm));

