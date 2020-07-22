import axios from 'axios';
import * as actionTypes from './actionsTypes';
import { AuthUrls, ROOT_URL } from '../../helpers/urls';
import { goToLoginPage } from '../../helpers/HomeClickActions';
import { checkActionsErrors, getCloudinaryLink } from '../../helpers/functions';

export const authStart = ()=>({
    type: actionTypes.AUTH_START,
});

export const authSuccess = token =>({
    type: actionTypes.AUTH_SUCCESS,
    token: token,
});

export const authFailLogin = error =>({
    type:actionTypes.AUTH_FAIL_LOGIN,
    loginErrors: error.response.data,
});

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    return {
        type: actionTypes.AUTH_LOGOUT,
        token: null,
    };
}


export const authFailSignup = error=>({
    type:actionTypes.AUTH_FAIL_SIGNUP,
    signupErrors: error.response.data,
});

export const authSignup= (username, email, password1, password2, history)=>{
    const  signupPath = AuthUrls.SIGNUP;
    return dispatch => {
        dispatch(authStart());
        axios.post(signupPath,{
            username: username,
            email: email,
            password1:password1,
            password2:password2,
        })
        .then(res=>{
            fetchToken(dispatch, res, history);
        })
        .catch(error=>{
           dispatch(authFailSignup(error));
        });
    }
}

export const authLogin = (username, password, history)=>{
    const loginPath = AuthUrls.LOGIN;
    return dispatch => {
        dispatch(authStart());
        axios.post(loginPath, {
            username: username,
            password: password,
        })
        .then(res =>{
            fetchToken(dispatch, res, history);
        })
        .catch(error=>{
            dispatch(authFailLogin(error));
            checkActionsErrors(error, history);
        });
    }
}


const fetchToken = (dispatch, res, history, path="/home/")=>{
    const token = res.data.key;
    localStorage.setItem('token', token);
    setExpirationDateAndDispatchToken(dispatch, token);
    history.push(path);
}

export const authCheckState = ()=>{
    return dispatch => {
       const token = getToken();

       if(token === undefined || token === null ){
            dispatch(logout());
       }
       else{
            const expirationDate = new Date(localStorage.getItem('expirationDate'));

            expirationDate <= new Date()? 
                dispatch(logout())
               :setExpirationDateAndDispatchToken(dispatch, token);
        }
       }
    }   

const setExpirationDateAndDispatchToken= (dispatch, token)=>{
    const expirationDate = getExperationDate();
    localStorage.setItem('expirationDate', expirationDate);
    dispatch(authSuccess(token));
    dispatch(checkAuthTimeout());
}

const getExperationDate = () =>( 
    new Date(new Date().getTime() + FIVE_DAYS_IN_MILLI_SECONDS)
);

export const checkAuthTimeout = () =>{
    return dispatch =>{
        setTimeout(()=>{  
          dispatch(logout());
        }, FIVE_DAYS_IN_MILLI_SECONDS);
    }
}

const FIVE_DAYS_IN_MILLI_SECONDS =   5 * 24 * 3600 * 1000;


// RESET PASSWORD

export const ResetPasswordAction = (email, history) =>{
    const resetPasswordPath = AuthUrls.RESET_PASSWORD
    return disptch => {
       axios.post(resetPasswordPath, {
           email: email,
       })
       .then(res=>{
            history.push("/password-reset-email-sent/");
       })
       .catch(error=>{
          // console.log("Error", error.response.data);
       })
    }
}

const resetPasswordConfirmFail = error=>({
    type:actionTypes.RESET_PASSWORD_CONFIRM,
    resetPasswordConfirmErrors: error.response.data,
});

export const ResetPasswordConfirm = (password1, password2, props) =>{
    const resetPasswordPathConfirm = AuthUrls.RESET_PASSWORD_CONFIRM
    return dispatch=>{
       const { uid, token } = props.match.params;
       axios.post(resetPasswordPathConfirm, {
           token: token,
           uid: uid,
           new_password1: password1,
           new_password2: password2,
       })
       .then(res=>{
           props.history.push("/");
           goToLoginPage();
       })
       .catch(error=>{
           console.log(error)
           console.log(error.response)
           dispatch(resetPasswordConfirmFail(error));
       });
    }
}

// Change Password 
export const changePasswordAction = (old_password, new_password1, new_password2, history)=>{
    const token = getToken();
    const changePasswordPath = AuthUrls.CHANGE_PASSWORD;
    return dispatch =>{
        if (token){
            axios.post(changePasswordPath,{
                old_password:  old_password,
                new_password1: new_password1,
                new_password2: new_password2,}, 
            { 
                headers: {
                    authorization: 'Token ' + token}
                },)
            .then(res=>{
                history.push('/');
            })
            .catch(error=>{
                dispatch(resetPasswordConfirmFail(error));
            });
        }   
    }
}
// User Profile

export const userProfileData = (profileData, token) =>({
    type: actionTypes.USER_PROFILE_DATA,
    profileData: profileData,
    token: token,
    profileDataReady: true
});

export const currentUserProfileDataAction = (history) =>{
    const userProfilePath = AuthUrls.USER_PROFILE;  
    return dispatch =>{
        const token = getToken();
        if(token){
            axios.get(userProfilePath, {
                headers: {
                    authorization: 'Token ' + token
                }
            })
            .then(res=>{
                localStorage.setItem('username', res.data.username);
                dispatch(userProfileData(res.data, token));
            })
            .catch(error=>{
                checkActionsErrors(error);
            })
        }
    }
}

export const otherUserProfileData = (otherUserProfileData)=>({
      type: actionTypes.OTHER_USER_PROFILE_DATA,
      otherUserProfileData: otherUserProfileData,
      otherUserProfileDataReady: true,
});
export const otherUserProfileDataAction = (props) =>{
    const { username } = props.match.params;
    const otheUserProfilePath = AuthUrls.OTHER_USER_PROFILE;
    const token = getToken();
    return dispatch=>{
        if(token){
            axios.get(`${otheUserProfilePath}${username}/`,{
                headers: {
                    Authorization: 'Token ' + token
                }
            }
            )
            .then(res=>{
                dispatch(otherUserProfileData(res.data))
            })
            .catch(error=>{
                checkActionsErrors(error, props.history);
            })
    }
    }
}

export const EditUserProfileAction = (editProfileValues) =>{
    let formData = new FormData();
    const uploadLink = AuthUrls.UPLOAD_IMG_LINK;
    const { headerImg, profileImg, history, username} = editProfileValues;
    formData.append("username", editProfileValues.username);
    formData.append("full_name", editProfileValues.fullName);
    formData.append("about", editProfileValues.about);
    formData.append("website", editProfileValues.website)
    formData.append("location", editProfileValues.location)

    return dispatch =>{
       if(profileImg && headerImg){
            const headerFormData = getCloudinaryLink(headerImg)
            axios.post(uploadLink, headerFormData)
            .then(res=>{
                formData.append("header_img_url", res.data.secure_url);
                axiosImgUpload(profileImg, "profile_img_url", formData, history, username);
            })
            .catch(error=>{
                console.log(error.response)
            })
        }
        else if(profileImg && !headerImg){
            axiosImgUpload(profileImg, "profile_img_url", formData, history, username);
        }
        else if(headerImg && !profileImg){
            axiosImgUpload(headerImg, "header_img_url", formData, history, username);
        }
        else if(!headerImg && !profileImg){
            axiosEditProfile(formData, history, username)
        }
    }
}


// Post user Recommendations
export const newRecommendationCreated = (recommendation)=>({
     type: actionTypes.NEW_RECOMMENDATION,
     newRecommendation: recommendation,
})
export const submittingNewRecommendation = (newRecommendation)=>{
    const token = getToken();
    const userID = newRecommendation.owner;
    const createNewRecommendationsPath = AuthUrls.CREART_NEW_RECOMMENDATION;
    return dispatch=>{
        if(token){
            axios.post(`${createNewRecommendationsPath}/${userID}/`, newRecommendation,{
                headers: {
                    Authorization: 'Token ' + token
                }
            })
            .then(res=>{
                dispatch(newRecommendationCreated(res.data));
            })
            .catch(error=>{
                checkActionsErrors(error);
            }) 
        }
    }
}


// Following Users

export const followUser = (currentUserID, userToUnfollowID)=>{
    const followUserPath = AuthUrls.FOLLOW_USER;
    const token = getToken();
    return dispatch =>{
        axios.post(`${followUserPath}/${currentUserID}/${userToUnfollowID}/`,
          {
              user:currentUserID,
              following_user: userToUnfollowID,
          }
        ,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            window.location.reload();
        })
        .catch(error=>{
            checkActionsErrors(error);
        })
    }
}

// Unfollowing Users

export const unfollowUser = (currentUserID, otherUserID)=>{
    const unfollowUserPath = AuthUrls.UNFOLLOW_USER;
    const token = getToken();
    return dispatch =>{
       axios.delete(`${unfollowUserPath}/${currentUserID}/${otherUserID}/`,{
        headers: {
            Authorization: 'Token ' + token
        }
       })
       .then(res=>{
          window.location.reload();
       })
       .catch(error=>{
        checkActionsErrors(error);
       })
    }
}

// Get Followers data 

const followingDataAction = (data) =>({
     type:actionTypes.FOLLOWING_DATA,
     followingData: data,
});

export const followingData = (username)=>{
    const token = getToken();
    return dispatch=>{
        if(token){
            axios.get(`/api/${username}/following/`,{
                headers: {
                    Authorization: 'Token ' + token
                }
            })
            .then(res=>{
                dispatch(followingDataAction(res.data));
            })
            .catch(error=>{
                checkActionsErrors(error);
            })
        }
    }
}

const followersDataAction = (data) =>({
    type:actionTypes.FOLLOWERS_DATA,
    followersData: data,
});

export const followersData = (username)=>{
    const followersDataPath = ROOT_URL;
    const token = getToken();
    return dispatch=>{
        if(token){
            axios.get(`/api/${username}/followers/`,{
                headers: {
                    Authorization: 'Token ' + token
                }
            })
            .then(res=>{
                 dispatch(followersDataAction(res.data));
            })
            .catch(error=>{
                checkActionsErrors(error);
            })
        }
    }
}

const recommendationDetailsAction = (details)=>({
    type: actionTypes.RECOMMENDATION_DETAILS,
    recommendation: details.recommendation,
    comments: details.comments,
    comments_count: details.recommendation.comments_count,
});

export const recommendationDetails = (props)=>{
    const { username, recom_id } = props.match.params;
    const token = getToken();
    return dispatch =>{
        axios.get(`/api/${username}/recommendations/${recom_id}/`, {
            headers: {
                Authorization: 'Token ' + token
            }
        })
            .then(res=>{
                dispatch(recommendationDetailsAction(res.data));
            })
            .catch(error=>{
                //console.log(error)
                checkActionsErrors(error, props.history);
            });
    }
}
const submitNewCommentAction = (data)=>({
     type: actionTypes.NEW_COMMENT,
     newComment: data,
});

export const submitNewComment = (newComment) =>{
    const token = getToken();
    const createNewCommentPath = AuthUrls.CREATE_NEW_COMMENT;
    return dispatch =>{
        if(token){
            axios.post(`${createNewCommentPath}`, newComment,
            {
                headers: {
                    authorization: 'Token ' + token
                }
            })
            .then(res=>{
                dispatch(submitNewCommentAction(res.data))
            })
            .catch(error=>{
                //console.log(error.response.data)
            }) 
        }
    }
}

const searchPeopleAction = (data) =>({
    type: actionTypes.SEARCH_PEOPLE,
    peopleSearchData: data,
});

export const searchPeople = (wordToSearch)=>{
    const peopleSearchPath = AuthUrls.PEOPLE_SEARCH_URL;
    const token = getToken();
    return dispatch =>{
       axios.get(`${peopleSearchPath}/${wordToSearch}/`,{
            headers: {
                Authorization: 'Token ' + token
            }
       })
       .then(res=>{
           dispatch(searchPeopleAction(res.data))
       })
       .catch(error=>{
        checkActionsErrors(error);
       })
    }
}

export const likeRecommendation = (recomID, userID)=>{
    const likeRecommendationPath = AuthUrls.LIKE_RECOMMENDATION
    const token = getToken();
    return dispatch =>{
        if(token){
            axios.post(`${likeRecommendationPath}/${recomID}/`,{
                user:userID,
                recommendation:recomID,
            },{
                    headers: {
                        Authorization: 'Token ' + token
                    }
            })
            .then(res=>{
                //pass;
            })
            .catch(error=>{
                checkActionsErrors(error);
            })
    }
    }
}

export const unlikeRecommendation = (recommendationID, userID)=>{
    const unlikeRecommendationPath = AuthUrls.UNLIKE_RECOMMENDATION;
    const token = getToken();
    return dispatch =>{
       axios.delete(`${unlikeRecommendationPath}/${userID}/${recommendationID}/`,{
        headers: {
            Authorization: 'Token ' + token
        }
       })
       .then(res=>{
           //pass
       })
       .catch(error=>{
        checkActionsErrors(error);
       })
    }
}

const deleteRecommendationAction = recomID =>({
    type:actionTypes.DELETE_RECOMMENDATION,
    recomID: recomID,
});
export const deleteRecommendation = (recomID, history="")=>{
    const deleteRecommendationPath = AuthUrls.DELETE_RECOMMENDATION;
    const token = getToken();
    return dispatch =>{
        if(token){
            axios.delete(`${deleteRecommendationPath}/${recomID}/`,{
                headers: {
                    Authorization: 'Token ' + token
                }
               })
               .then(res=>{
                   if(history){
                       history.push("/home/")
                   }
                   else{
                     dispatch(deleteRecommendationAction(recomID))
                   }
               })
               .catch(error=>{
                  checkActionsErrors(error);
               })
        }
    }
}

export const updateRecommendation = updatedRecommendation =>{
    const updateRecommendationPath = AuthUrls.UPDATE_RECOMMENDATION;
    const token = getToken();
    const formData = new FormData();

    formData.append("content", updatedRecommendation.content);
    formData.append("hashtags", updatedRecommendation.hashtags);
    return dispatch=>{
        if(token){
            axios.patch(`${updateRecommendationPath}/${updatedRecommendation.id}/`, formData ,{
                headers: {
                    Authorization: 'Token ' + token
                }
               })
               .then(res=>{
                  window.location.reload();
               })
               .catch(error=>{
                  checkActionsErrors(error);
               })
        }
    }
}

//////////////////////////////////////////////////////

const getRecommendationsStartAction = ()=>({
    type:actionTypes.GET_RECOMMENDATIONS,
});

const getRecommendationsSuccessAction= (data)=>({
    type:actionTypes.GET_RECOMMENDATIONS_SUCCESS,
    latestRecommendations: data.results,
    next: data.next,
    count:data.count,
});

const getRecommendationsFailAction=(error)=>({
    type:actionTypes.GET_RECOMMENDATIONS_FAIL,
    error: error,
});

const loadMoreAction=()=>({
    type:actionTypes.LOAD_MORE,
});

const loadMoreRecommendationsSuccessAction=(data)=>({
    type:actionTypes.LOAD_MORE_RECOMMENDATIONS_SUCCESS,
    latestRecommendations: data.results,
    next: data.next,
});

const loadMoreRecommendationsFailAction=(error)=>({
    type:actionTypes.LOAD_MORE_RECOMMENDATIONS_FAIL,
    error: error,
});

export const getRecommendationsList = (path)=>{
    const token = getToken();
    return dispatch =>{
        dispatch(getRecommendationsStartAction());
        //we need to add first limit here say only 20 posts
        axios.get(path,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            dispatch(getRecommendationsSuccessAction(res.data))
        })
        .catch(error=>{
            dispatch(getRecommendationsFailAction(error));
            checkActionsErrors(error);
        });
    }
}

export const loadMoreRecommendation = (path)=>{
    const token = getToken();
    return dispatch =>{
        dispatch(loadMoreAction());
        // we need to pass limit here as a start to fetch data after previous call
        axios.get(path,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            dispatch(loadMoreRecommendationsSuccessAction(res.data))
        })
        .catch(error=>{
            dispatch(loadMoreRecommendationsFailAction(error));
            checkActionsErrors(error);
        })
    }   
}

export const getNotificationsSuccessAction = (data)=>({
    type: actionTypes.GET_NOTIFICATIONS,
    notifications:data.results,
    count: data.count,
    next: data.next,
});

export const loadMoreNotificationsSuccessAction = (data)=>({
    type:actionTypes.LOAD_MORE_NOTIFICATIONS,
    notifications:data.results,
    next: data.next,
});

 
export const getNotifications = (pk)=> {
    const notificationsPath = AuthUrls.NOTIFICATIONS_PATH;
    const token = getToken();
    return dispatch=>{
        dispatch(loadMoreAction());
        axios.get(`${notificationsPath}/${pk}/?limit=10&offset=0`,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            dispatch(getNotificationsSuccessAction(res.data));
        })
        .catch(error=>{
            checkActionsErrors(error);
        })

    }
}

export const loadMoreNotifications = (pk, offset)=>{
    const notificationsPath = AuthUrls.NOTIFICATIONS_PATH;
    const token = getToken();
    return dispatch=>{
        dispatch(loadMoreAction());
        axios.get(`${notificationsPath}/${pk}/?limit=10&offset=${offset}`,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            dispatch(loadMoreNotificationsSuccessAction(res.data));
        })
        .catch(error=>{
            checkActionsErrors(error);
        })

    }
}

export const markNotificationAsSeen =(pk)=>{
    const markNotificationAsSeenPath = AuthUrls.NOTIFICATIONS_SEEN;
    const token = getToken();
    return dispatch=>{
        dispatch(loadMoreAction());
        axios.get(`${markNotificationAsSeenPath}/${pk}/`,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            //pass
        })
        .catch(error=>{
            checkActionsErrors(error);
        })

    }
}
export const newNotificationsCountAction = (data)=>({
    type:actionTypes.NEW_NOTIFICATIONS_COUNT,
    count: data.count,
});
export const getNewNotificationsCount = (pk)=>{
    const getNewNotificationsCountPath = AuthUrls.NEW_NOTIFICATIONS_COUNT;
    const token = getToken();
    return dispatch=>{
        dispatch(loadMoreAction());
        axios.get(`${getNewNotificationsCountPath}/${pk}/`,{
            headers: {
                Authorization: 'Token ' + token
            }
        })
        .then(res=>{
            dispatch(newNotificationsCountAction(res.data));
        })
        .catch(error=>{
            checkActionsErrors(error);
        })

    }
}

const deleteAccountFail = data =>({
    type:actionTypes.DELETE_ACCOUNT_FAIL,
    deleteAccountErrors: data,
})
export const deleteAccount = (pk, password, history) =>{
    const deleteAccountPath = AuthUrls.DELETE_ACCOUNT;
    const token = getToken();
    return dispatch=>{
        if(token){
            axios.get(`${deleteAccountPath}/${pk}/${password}/`,{
                headers: {
                    Authorization: 'Token ' + token
                }
               })
               .then(res=>{
                   if(res.data === "Wrong password"){
                      dispatch(deleteAccountFail(res.data))
                   }
                   else{
                      dispatch(logout())
                      history.push('/')
                   }
                   
               })
               .catch(error=>{
                  checkActionsErrors(error);
               })
        }
    }
}
///////////////////////////////////////////////////////

const axiosEditProfile = (formData, history, username)=>{
    const token = getToken();
    const userProfilePath = AuthUrls.USER_PROFILE;
    if(token){
        return (axios.patch(userProfilePath, formData, {
            headers: {
                'content-type': 'multipart/form-data',
                authorization: 'Token ' + token
            }
       })
       .then(res=>{
           history.push(`/${username}/`);
           window.location.reload();
        
       })
       .catch(error=>{
          checkActionsErrors(error);
       })  
    )
    }
}

const axiosImgUpload = (img, name, formData, history, username)=>{
    const cloudFormData = getCloudinaryLink(img);
    const uploadLink = AuthUrls.UPLOAD_IMG_LINK;
 
    axios.post(uploadLink, cloudFormData)
                    .then(res=>{
                        formData.append(name, res.data.secure_url);
                        axiosEditProfile(formData, history, username);
                    })
                    .catch(error=>console.log(error))
}


const getToken = ()=>{
    return localStorage.getItem('token');
}