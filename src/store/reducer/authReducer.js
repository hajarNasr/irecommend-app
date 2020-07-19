import * as actionTypes from '../actions/actionsTypes';
import { updateState } from '../../helpers/updateState';

const initialState = {
    token: null,
    signupErrors: null,
    loginErrors: null,
}

const authStartReducer = (state, action)=>(
    updateState(state, {
        signupErrors: null,
        loginErrors: null,
    })
);

const authSuccessReducer = (state, action) =>(
    updateState(state, {
        token: action.token,
        signupErrors: null,
        loginErrors: null,
    })
);

const authLogoutReducer = (state, action)=>(
    updateState({
        token: null,
        signupErrors: null,
        loginErrors: null,
    })
);

 const authFailSignupReducer = (state, action)=>(
    updateState(state, {
        signupErrors: action.signupErrors,
    })
 );

 const authFailLoginReducer = (state, action)=>(
    updateState(state, {
        loginErrors: action.loginErrors,
    })
 );

 const resetPasswordConfirmReducer = (state, action)=>(
    updateState(state, {
        resetPasswordConfirmErrors: action.resetPasswordConfirmErrors,
    })
 );

 const getCurrentUserData = (state, action) =>(
     updateState(state, {
        profileData: action.profileData,
        token: action.token,
        profileDataReady: true,
     })
 );

 const getOthertUserData = (state, action) =>(
      updateState(state, {
       otherUserProfileData: action.otherUserProfileData,
       otherUserProfileDataReady: true,
    })
 );

const newRecommendationCreated = (state, action)=>(
    updateState(state,{
        newRecommendation: action.newRecommendation,
        latestRecommendations: [action.newRecommendation, ...state.latestRecommendations],
        count: state.count+1,
     })
);

const recommendationDetailsReducer = (state, action)=>(
    updateState(state,{
        recommendationDetailsReady:true,
        recommendation: action.recommendation,
        comments: action.comments,
        comments_count: action.comments_count,
    })
);

const newCommentReducer = (state, action)=>(
    updateState(state,{
        comments: [action.newComment, ...state.comments],
        comments_count: state.comments_count + 1,
    })
);

const searchPeopleReducer = (state, action)=>(
    updateState(state,{
        peopleSearchData: action.peopleSearchData,
        isPeopleSearchResultReady: action.peopleSearchData?true:false,
    })
);

const followingDataReducer = (state, action)=>(
    updateState(state,{
        isFollowingDataReady: true,
        followingData: action.followingData,
    })
);

const followersDataReducer = (state, action)=>(
    updateState(state,{
        isFollowersDataReady: true,
        followersData: action.followersData,
    })
);

const deleteRecommendationReducer = (state, action) =>(
    updateState(state,{
        latestRecommendations: state.latestRecommendations.filter(item=>item.id !== action.recomID)
    })
);

const getRecommendationsStartReducer = (state, action)=>(
    updateState(state,{
        latestRecommendations: [],
        isLoading: true,
    })
);

const getRecommendationsSuccessReducer = (state, action)=>(
    updateState(state,{
        latestRecommendations: action.latestRecommendations,
        next:action.next,
        isLoading: false,
        count: action.count,
    })
);

const getRecommendationsFailReducer = (state, action)=>(
    updateState(state,{
          error:action.error,
          isLoading: true,
    })
);

const loadMoreReducer = (state, action)=>(
    updateState(state,{
        isLoading: true,
    })
);

const loadMoreRecommendationsSuccessReducer = (state, action)=>(
    updateState(state,{
        latestRecommendations: [...state.latestRecommendations, ...action.latestRecommendations],
        next:action.next,
        isLoading: false,
    })
);

const loadMoreRecommendationsFailReducer = (state, action)=>(
    updateState(state,{
          error:action.error,
          isLoading: true,
    })
);

const getNotificationsReducer = (state, action)=>(
    updateState(state,{
        notifications: action.notifications,
        next:action.next,
        isLoading: false,
        count: action.count,
  })
);

const loadMoreNotificationsReducer= (state, action)=>(
    updateState(state,{
        notifications: [...state.notifications, ...action.notifications],
        next:action.next,
        isLoading: false,
  })
);

const newNotificationsCount = (state, action)=>(
    updateState(state,{
        notificationsCount: action.count, 
    })
);

const deleteAccountFailReducer = (state, action)=>(
    updateState(state,{
        deleteAccountErrors: action.deleteAccountErrors, 
    })
);

const reducer = (state=initialState, action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:       return authStartReducer     (state, action);
        case actionTypes.AUTH_SUCCESS:     return authSuccessReducer   (state, action);
        case actionTypes.AUTH_LOGOUT:      return authLogoutReducer    (state, action);
        case actionTypes.AUTH_FAIL_SIGNUP: return authFailSignupReducer(state, action);
        case actionTypes.AUTH_FAIL_LOGIN:  return authFailLoginReducer (state, action);
        case actionTypes.RESET_PASSWORD_CONFIRM: return resetPasswordConfirmReducer(state, action);
        case actionTypes.USER_PROFILE_DATA:return getCurrentUserData(state, action);
        case actionTypes.OTHER_USER_PROFILE_DATA:return getOthertUserData(state, action);
        case actionTypes.NEW_RECOMMENDATION:  return newRecommendationCreated(state, action);   
        case actionTypes.RECOMMENDATION_DETAILS: return recommendationDetailsReducer(state, action);
        case actionTypes.NEW_COMMENT: return newCommentReducer(state, action);
        case actionTypes.SEARCH_PEOPLE:  return searchPeopleReducer(state, action);
        case actionTypes.FOLLOWERS_DATA: return followersDataReducer(state, action);
        case actionTypes.FOLLOWING_DATA: return followingDataReducer(state, action);
        case actionTypes.DELETE_RECOMMENDATION: return deleteRecommendationReducer(state, action);
        ///////////////////////////////////
        case actionTypes.GET_RECOMMENDATIONS :return getRecommendationsStartReducer(state, action);
        case actionTypes.GET_RECOMMENDATIONS_SUCCESS :return getRecommendationsSuccessReducer(state, action);
        case actionTypes.GET_RECOMMENDATIONS_FAIL :return getRecommendationsFailReducer(state, action);
        case actionTypes.LOAD_MORE :return loadMoreReducer(state, action);
        case actionTypes.LOAD_MORE_RECOMMENDATIONS_SUCCESS :return loadMoreRecommendationsSuccessReducer(state, action);
        case actionTypes.LOAD_MORE_RECOMMENDATIONS_FAIL :return loadMoreRecommendationsFailReducer(state, action);
        ///////////////////////////////////
        case actionTypes.GET_NOTIFICATIONS: return getNotificationsReducer(state, action);
        case actionTypes.LOAD_MORE_NOTIFICATIONS: return loadMoreNotificationsReducer(state, action);
        case actionTypes.NEW_NOTIFICATIONS_COUNT: return newNotificationsCount(state, action);
        case actionTypes.DELETE_ACCOUNT_FAIL: return deleteAccountFailReducer(state, action)
        default:
            return state;
    }
}

export default reducer;