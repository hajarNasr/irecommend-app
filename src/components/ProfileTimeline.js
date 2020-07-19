import React from 'react';
import SearchTabs from './SearchTabs';
import UserLikes from './UserLikes';
import UserRecommendations from './UserRecommendations';

class ProfileTimeline extends React.Component{
    render(){
        return(
            <div>
               <SearchTabs>
                    <div label="Recommendations">
                        <UserRecommendations 
                            currentUserID = {this.props.currentUserID}
                            isCurrentUser = {this.props.isCurrentUser}
                            username={this.props.username}/>
                    </div>  
                    <div label="Likes">
                        <UserLikes
                            username={this.props.username}
                            currentUserID = {this.props.currentUserID}
                        />
                    </div>                  
               </SearchTabs>
            </div>
        );
    }
}

export default ProfileTimeline;