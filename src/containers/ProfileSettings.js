import React from 'react';
import ModalContainer from './ModalContainer';
import '../css/profile-settings.css';

class ProfileSettings extends React.Component{
    render(){
        return(
            <div className="profile-settings-wrapper">
                <ModalContainer
                    child = "ChangePasswordForm"
                    submitBtnTxt = "Change Password"
                />
                <ModalContainer
                    child="DeleteAccountForm"
                    submitBtnTxt = "Delete Account"
                    currentUserID={this.props.currentUserID}
                />
            </div>
        );
    }
}

export default ProfileSettings;