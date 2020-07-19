import React from 'react';
import FormField from './FormField';
import SubmitBtn from './SubmitBtn';
import { goToSignupPage } from '../helpers/HomeClickActions';
import {FaEyeIcon, FaEyeSlashIcon} from './FaIcons';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import * as actions from '../store/actions/authActions';
import '../css/signup-login-forms.css';

class LoginForm extends React.Component{
    state = {
        showLoginPassword:false,
    }
    handleLoginSubmit = (event)=>{
        event.preventDefault();
        const formElems = event.target.elements;
        const username = formElems.username.value;
        const password = formElems.password.value;
        this.props.onLogin(username, password, this.props.history);
    }

    handleShowPasswordClick = ()=>{
        this.setState({showLoginPassword: !this.state.showLoginPassword});
    }
    render(){
        return(
            <div className="login-form-wrapper display-none" id="login-page">
                <div className="login-left">
                    <form onSubmit={this.handleLoginSubmit} className="login-form" id="login-form">
                        <FormField 
                            id="login-username" 
                            name = "username"
                            type="text" 
                            label="Username"/>
                       <div style={{position:"relative"}}>
                            <div className="password-eye">     
                                {this.state.showLoginPassword?
                                    <FaEyeIcon onClick ={this.handleShowPasswordClick}/>
                                    :     
                                    <FaEyeSlashIcon onClick ={this.handleShowPasswordClick} />   
                                }  
                            </div> 
                            <FormField
                                    id="password"
                                    name = "password"
                                    label= "Password"
                                    type = {this.state.showLoginPassword? "text":"password"}
                            />
                        </div>
                        <Link to="/reset/password/" 
                              className="forgot-password-link">
                              Forgot password?
                        </Link> 
                        <div id="login-error" className="error-msg">{this.props.loginErrors? "Wrong username or password":""}</div>
                        <SubmitBtn
                                btnText = "Login"
                                className="login__submit-btn"
                                id = "login__submit-btn"
                            />  
                          
                        </form>
                        <button className="not-a-member-yet-link"
                              onClick={goToSignupPage}>
                              Not a member yet?
                        </button> 
                    </div>
                    <div className="login-right"></div>
                </div>
        
        );
    }
}

export const mapStateToProps = state =>({
    loginErrors: state.loginErrors,
});

const mapDispatchToProps = dispatch =>({
    onLogin: (username, password, history) => dispatch(actions.authLogin(username, password, history)),
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoginForm));