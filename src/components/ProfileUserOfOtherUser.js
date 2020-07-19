import React from 'react';
import { connect } from 'react-redux';
import {withRouter} from 'react-router-dom';
import  UserProfile  from './UserProfile';
import { otherUserProfileDataAction } from '../store/actions/authActions';

class ProfileUserOfOtherUser extends React.Component{
    componentDidMount(){
        this.props.onGetOtherUserProfile(this.props);
    }
    render(){
        return(
            <div>
               {this.props.otherUserProfileDataReady &&
                   <UserProfile {...this.props}
                                 isCurrentUser ={false}
                                 currentUserID = {this.props.currentUserID}/>
                }
            </div>
        );
    }
}

const mapStateToProps = state =>({
    profileData: state.otherUserProfileData,
    otherUserProfileDataReady: state.otherUserProfileDataReady,
});

const mapDispatchToProps = dispatch => ({
     onGetOtherUserProfile: (props)=> dispatch(otherUserProfileDataAction(props)),
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ProfileUserOfOtherUser));