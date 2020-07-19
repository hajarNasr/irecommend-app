import React from 'react';
import RecommendationsList from '../components/RecommendationsList';

const UserLikes = (props)=>(
    <main>
        <RecommendationsList
            parent = "UserLikes"
            currentUserID= {props.currentUserID}
            username = {props.username}
        />
    </main>
);

export default UserLikes;