import React from 'react';
import { goToLoginPage } from '../helpers/HomeClickActions';
import FormField from './FormField';
import SubmitBtn from './SubmitBtn';
import {FaEyeIcon, FaEyeSlashIcon} from './FaIcons';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import * as actions from '../store/actions/authActions';
import '../css/signup-login-forms.css';

class SignupForm extends React.Component{
    state = {
        showSignupPassword:false,
    }

    handleSignupSubmit = (event)=>{
        event.preventDefault();
        const formElements = event.target.elements;
        const username  = formElements.username.value;
        const email     = formElements.email.value;
        const password1 = formElements.password1.value;
        const password2 = formElements.password2.value;
        this.props.onSignup(username, email, password1, password2, this.props.history);    
    }
    handleShowPasswordClick = ()=>{
        this.setState({showSignupPassword: !this.state.showSignupPassword});
    }
    render(){
        const passwordFeildType = this.state.showSignupPassword? "text":"password"; 
        return(
            <div className="signup-form-wrapper" id="signup-page">
                <div className="signup-left">
                <form onSubmit={this.handleSignupSubmit} className="signup-form" id="signup-form">
                        <FormField 
                            id="signup-username" 
                            type="text" 
                            name = "username"
                            errorMsgs = {this.props.signupErrors}
                            label="Username"/>
                    
                        <FormField 
                            id="email"  
                            label="Email" 
                            name = "email"
                            errorMsgs = {this.props.signupErrors}
                            type="email"/>
                        <div style={{position:"relative"}}>    
                                <div className="password-eye">     
                                    {this.state.showSignupPassword?
                                        <FaEyeIcon onClick = {this.handleShowPasswordClick}/>
                                        :     
                                        <FaEyeSlashIcon onClick = {this.handleShowPasswordClick}/>   
                                    }   
                        </div>
                         <FormField
                                id="password1"
                                name = "password1"
                                label= "Password"
                                errorMsgs = {this.props.signupErrors}
                                type = {passwordFeildType}/>
                        
                        </div>
                        <FormField
                                id="password2"
                                name = "password2"
                                label= "Conform password"
                                errorMsgs = {this.props.signupErrors}
                                type = {passwordFeildType}/>     
                        <SubmitBtn
                                btnText = "Sign up"
                                className= "signup__submit-btn"
                                id = "signup__submit-btn"
                            />        
                    </form>
                    <button className="already-a-member-link"
                          onClick={goToLoginPage}
                          >Already a member?</button> 
                    </div>
                    
                    <div className="signup-right"></div>
                </div>
        
        );
    }
}

export const mapStateToProps = state =>({
    signupErrors: state.signupErrors,
});

const mapDispatchToProps = dispatch=>({
    onSignup: (username, email, password1, password2, history)=>
                                  dispatch(actions.authSignup(username, email, password1, password2, history)),
})
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SignupForm));