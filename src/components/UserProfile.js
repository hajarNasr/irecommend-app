import React from 'react';
import { FaLinkIcon, FaLocationIcon } from './FaIcons';
import FollowBtn from './FollowBtn';
import ProfileTimeline from './ProfileTimeline';
import { Link, withRouter } from 'react-router-dom';

class UserProfile extends React.Component{
    render(){
        const profileData = this.props.profileData;                   
        return(
            <div className="profile-wrapper">
            <div className="profile-content">
            <div className="profile-content__images">
                    <div style={{ backgroundImage: `url(${profileData['header_img']
                                                    .replace("https://irecommend-app.herokuapp.com","")})` }}
                        className="profile-content__header-img"/>   
              {console.log(`${profileData['header_img']}`)}
                    <div style={{ backgroundImage: `url(${profileData['profile_img']})` }}
                        className="profile-content__profile-img"/> 
                    {this.props.isCurrentUser?     
                        <div className="edit-profile-btn">
                        <Link to={`/${profileData.username}/edit-profile/`}>Edit Profile</Link>
                        </div>
                        :
                        <div>
                           <FollowBtn 
                               otherUserID = {this.props.profileData.pk}
                               currentUserID  = {this.props.currentUserID}
                               isFollowing = {profileData.is_following}
                           />
                        </div>
                    }
                </div>
                    <div className="profile-content__bio">  
                        <div className="profile-content__bio">   
                            <div className="profile-content__bio__name-and-handler">
                                <p>{profileData["full_name"]}</p>
                                <p>@{profileData.username}</p> 
                            </div> 
                            <div className="followers-and-bio">
                              <div className="x">
                                  <div className="profile-content__bio__about">
                                        <p>{profileData.about}</p>
                                   </div>
                                   <div className="profile-content__bio__location-and-website">
                                    <div className="profile-content__bio__location">
                                            {profileData.location && <FaLocationIcon/>}
                                            {profileData.location}
                                        </div>
                                        <div className="profile-content__bio__website">
                                            {profileData.website && <FaLinkIcon/>}
                                            <a href={profileData.website} target="blank">{profileData.website}</a>
                                        </div>
                                   </div>
                            </div>
                            <div className="followers-count">
                                <div>
                                   <Link to={`/${profileData.username}/following/`}>Following: {profileData.following_count}</Link>
                                </div>
                                <div>
                                <Link to={`/${profileData.username}/followers/`}>Followers: {profileData.followers_count}</Link>
                                </div>
                            </div>
                        </div>  
                    </div>  
                    </div>
                    <div className="profile-content__timeline">
                        <ProfileTimeline  
                            currentUserID = {this.props.currentUserID}
                            isCurrentUser = {this.props.isCurrentUser}
                            username={profileData.username}/>
                        </div> 
            </div>
            </div>
     ); 
   }
}

export default withRouter(UserProfile);
