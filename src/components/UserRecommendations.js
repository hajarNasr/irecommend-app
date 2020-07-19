import React from 'react';
import RecommendationsList from '../components/RecommendationsList';
import '../css/user-recommendations.css';

const UserRecommendations = (props)=>(
    <main>
        <RecommendationsList
            parent = "UserRecommendations"
            currentUserID= {props.currentUserID}
            username = {props.username}
            isCurrentUser = {props.isCurrentUser}
        />
    </main>
);

export default UserRecommendations;