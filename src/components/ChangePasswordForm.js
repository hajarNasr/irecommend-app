import React from 'react';
import FormField from './FormField';
import SubmitBtn from './SubmitBtn';
import { connect } from 'react-redux';
import { withRouter, Redirect } from 'react-router-dom';
import { changePasswordAction } from '../store/actions/authActions';
import '../css/reset-password.css';

class ChangePasswordForm extends React.Component{
    handleChangePasswordSubmit= (e)=>{
        e.preventDefault();
        let formElements = e.target.elements;
        let oldPassword = formElements.old_password.value;
        let newPassword1 = formElements.new_password1.value;
        let newPassword2 = formElements.new_password2.value;
        this.props.onChangePassword(oldPassword, newPassword1, newPassword2, this.props.history);
    }
    render(){
        return (
            <div className="change-password-wrapper">
             {this.props.isAuthenticated?
                <form onSubmit={this.handleChangePasswordSubmit} 
                      id = "change-password-form"
                      className="change-password-form">
                    <FormField 
                            type = "password"
                            label = "Old Password"
                            name = "old_password"
                            placeholder = "Enter your old password"
                            errorMsgs = {this.props.passwordConfirmErrors}
                        />
                        <FormField 
                            type = "password"
                            label = "New Password"
                            name = "new_password1"
                            placeholder = "Enter your new password"
                            errorMsgs = {this.props.passwordConfirmErrors}
                        />
                        <FormField 
                            type = "password"
                            label = "Confirm Password"
                            name = "new_password2"
                            placeholder = "confirm your new password"
                            errorMsgs = {this.props.passwordConfirmErrors}
                        />
                    <SubmitBtn 
                            type="submit"
                            btnText = "Submit"
                            className="change-password-submit-btn"
                        />
                </form>
                :
                <Redirect to="/unauthorized-access/"/>
                } 
            </div>
        );
}
}

const mapStateToProps = state =>({
    isAuthenticated: localStorage.getItem('token') !== null,
    passwordConfirmErrors: state.resetPasswordConfirmErrors,
});

const mapDispatchToProps = dispatch =>{
    return {
        onChangePassword: (oldPassWord, newPassWord1, newPassword2, history)=> 
                   dispatch(changePasswordAction(oldPassWord, newPassWord1, newPassword2, history))
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChangePasswordForm));