import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ProfileOfUser from '../components/ProfileOfUser';
import EditUserProfile from '../components/EditUserProfile';
import RecommendationDetail from '../components/RecommendationDetail';
import SearchResult from '../components/SearchResult';
import Notifications from '../components/Notifications';
import Followers from '../components/Followers';
import Following from '../components/Following';
import Spinner from '../components/Spinner';
import NotFound404 from '../components/NotFound404';
import ProfileSettings from './ProfileSettings';
import LoggedinHeader from './LoggedinHeader';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { currentUserProfileDataAction } from '../store/actions/authActions';
import LoggedinHome from './LoggedinHome';

class LoggedinRoutes extends React.Component{
    componentDidMount (){
        this.props.getUserData(this.props.history);
    }
    render(){
        const { profileData } = this.props;
        return(
           this.props.profileDataReady?
           <div className="switch">
                <LoggedinHeader currentUser = {profileData.username}
                                currentUserID={profileData.pk} />
                <Switch>
                    <Route exact path="/home/" 
                                render = {()=><LoggedinHome 
                                                currentUserID={profileData.pk}
                                                key = {()=>Date.now()}
                                                currentUser = {profileData.username}/>}
                                />
                    <Route exact path="/notifications/"
                                 render = {()=><Notifications 
                                                currentUserID={profileData.pk}
                                                currentUser = {profileData.username}/>}
                    />
                    <Route path="/profile/settings/" 
                           render = {()=><ProfileSettings 
                                             currentUserID={profileData.pk}/>}
                           />

                    <Route exact path="/:username/" render={()=><ProfileOfUser
                                                                    currentUser = {profileData.username}
                                                                    profileData =
                                                                    {this.props.profileDataWithoutFollowers} />}
                                                            />

                    <Route exact path="/:username/edit-profile/" 
                                render = {()=><EditUserProfile 
                                                    profileData = {this.props.profileDataWithoutFollowers}/>}
                                />

                    <Route exact path="/:username/recommendations/:recom_id/" 
                                render={()=><RecommendationDetail 
                                                    currentUserProfileImg = {profileData.profile_img}
                                                    currentUserID={profileData.pk}/>}
                                                    />

                    <Route exact path="/search/:wordToSearch/"
                                 render={()=><SearchResult 
                                                 currentUserID={profileData.pk}
                                 />}/>

                    <Route exact path="/:username/following/" 
                                render={()=><Following
                                                currentUser={profileData.username}/>}
                                                />

                    <Route exact path="/:username/followers/"     
                                render={()=><Followers
                                                currentUser={profileData.username}/>}    
                                            />
                    <Route exact path="/404/not-found/" component={NotFound404} /> 
                    <Route component={NotFound404}/>                                                    
                </Switch>
           </div>
           :
            <div className="m-auto"><Spinner/></div>
    
           
        );
    }
}

const mapStateToProps = state =>{
    const newState = {...state.profileData};
    delete newState.followers;
    delete newState.following;
    const profileDataWithoutFollowers = {...newState};
    return {
        profileDataReady: state.profileDataReady,
        profileDataWithoutFollowers: profileDataWithoutFollowers,
        profileData: state.profileData,
    }
}

const mapDispatchToProps = dispatch =>({
    getUserData: (history)=> dispatch(currentUserProfileDataAction(history))
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedinRoutes));