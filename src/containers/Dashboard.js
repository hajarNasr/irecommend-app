import React from 'react';
import RecommendationsList from '../components/RecommendationsList';
import '../css/user-recommendations.css';

const Dashboard =(props)=>(
    <main>
        <RecommendationsList
            parent = "Dashboard"
            currentUserID= {props.currentUserID}
            isCurrentUser = {true}
        />
    </main>
)

export default Dashboard;