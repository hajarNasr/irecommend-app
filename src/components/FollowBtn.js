import React from 'react';
import { connect } from 'react-redux';
import { followUser, unfollowUser} from '../store/actions/authActions';

class FollowBtn extends React.Component{
    changeBtnTxt = (text)=>{
        this.setState({followBtnTxt:text});
    }
    handleClickingFollowBtn = () =>{
        const {currentUserID, otherUserID} = this.props;

        if(this.props.isFollowing){
           this.props.onUnfollowingUser(currentUserID, otherUserID) 
           this.changeBtnTxt("Follow");
        }
        else{
           this.props.onFollowingUser(currentUserID, otherUserID);
           this.changeBtnTxt("Unfollow");
        }
    }
    state = {
        followBtnTxt: this.props.isFollowing? "Unfollow": "Follow",
    }
    render(){
        return(
            <button 
                className="profile-follow-btn"
                onClick={this.handleClickingFollowBtn}>
                {this.state.followBtnTxt}
           </button>
        );
    }
}

const mapDispatchToProps = dispatch =>({
    onFollowingUser: (currentUserID, userToFollowID)    => dispatch(followUser(currentUserID, userToFollowID)),
    onUnfollowingUser: (currentUserID, otherUserID)=> dispatch(unfollowUser(currentUserID, otherUserID)),
});
export default connect(null, mapDispatchToProps)(FollowBtn);