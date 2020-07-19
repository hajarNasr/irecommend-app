import React from 'react';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { connect } from 'react-redux';
import { withRouter} from 'react-router-dom';
import { deleteAccount } from '../store/actions/authActions';

const DeleteAccountForm =(props)=>{
    const handleDeteteAccountSubmit = (e)=>{
        e.preventDefault();
        const password = e.target.elements.password;
        if(password){
            props.onDeleteAccount(props.currentUserID, password.value, props.history);
            password.value="";
        }
    }
    return(
        <div className="">
        <form onSubmit={handleDeteteAccountSubmit} className="delete-account-form">
            <span>Please Enter your password to delete account.</span>
             <FormInput
                 type = "password"
                 name = "password"
                 placeholder="Password"
             />
             {props.deleteAccountErrors && 
               <div className="wrong-password">Wrong password</div>}
               
             <SubmitBtn
                 btnText="Delete"
                 className="delete-account-submit-btn"
             />
        </form>
     </div>
    );
}

const mapStateToProps = state =>({
    deleteAccountErrors: state.deleteAccountErrors,
});

const mapDispatchToProps = dispatch=>({
    onDeleteAccount: (pk, password, history)=> dispatch(deleteAccount(pk, password, history)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(DeleteAccountForm));