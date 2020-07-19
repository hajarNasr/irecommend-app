import React from 'react';
import  UserProfile  from './UserProfile';
import ProfileUserOfOtherUser from './ProfileUserOfOtherUser';
import { withRouter } from 'react-router-dom'; 
import '../css/user-profile.css';

const ProfileOfUser =(props)=>{
    const { username } = props.match.params; 
    const currentUser  = props.profileData.username; 
    const currentUserID = props.profileData.pk;

    return(
        username === currentUser?
        // logged in user
        <UserProfile {...props} 
                        isCurrentUser = {true}
                        currentUserID = {currentUserID}/> 
        :
        <ProfileUserOfOtherUser 
                        currentUserID = {currentUserID}/>  
    );                            
}

export default withRouter(ProfileOfUser);


