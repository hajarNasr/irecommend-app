export const ROOT_URL = "";

export const AuthUrls = {
    LOGIN: `${ROOT_URL}/rest-auth/login/`,
    SIGNUP: `${ROOT_URL}/rest-auth/registration/`,
    CHANGE_PASSWORD: `${ROOT_URL}/rest-auth/password/change/`,
    RESET_PASSWORD: `${ROOT_URL}/rest-auth/password/reset/`,
    RESET_PASSWORD_CONFIRM: `${ROOT_URL}/rest-auth/password/reset/confirm/`,
    USER_PROFILE: `${ROOT_URL}/rest-auth/user/`,
    OTHER_USER_PROFILE: `${ROOT_URL}api/`,
    ALL_USER_RECOMMENDATIONS: `${ROOT_URL}/recommendations`,
    CREART_NEW_RECOMMENDATION: `${ROOT_URL}/create/recommendations`,
    DELETE_RECOMMENDATION: `${ROOT_URL}/delete/recommendation`,
    UPDATE_RECOMMENDATION: `${ROOT_URL}/update/recommendation`,
    CHECK_FOLLOWERS: `${ROOT_URL}/check/followers`,
    FOLLOW_USER:`${ROOT_URL}/follow`,
    UNFOLLOW_USER:`${ROOT_URL}/unfollow`,
    ALL_FOLLOWING_USERS_RECOMMENDATIONS: `${ROOT_URL}/home-recommendations`,
    CREATE_NEW_COMMENT: `${ROOT_URL}/create/new/comment/`,
    PEOPLE_SEARCH_URL: `${ROOT_URL}search/people`,
    HASHTAG_SEARCH_URL: `${ROOT_URL}search/hashtag`,
    LIKE_RECOMMENDATION: `${ROOT_URL}/like/recommendation`,
    UNLIKE_RECOMMENDATION:`${ROOT_URL}/unlike/recommendation`,
    USER_LIKES: `${ROOT_URL}all/likes`,
    NOTIFICATIONS_PATH:`${ROOT_URL}api/notifications`,
    NOTIFICATIONS_SEEN: `${ROOT_URL}/mark/notifications/seen`,
    NEW_NOTIFICATIONS_COUNT: `${ROOT_URL}/new-notifications-count`,
    DELETE_ACCOUNT:`${ROOT_URL}/delete/user-account`,
};