import React from 'react';
import RecommendationsList from './RecommendationsList';
import '../css/user-recommendations.css';

const HashTagSearch =(props)=>(
    <main>
        <RecommendationsList
            parent = "HashTagSearch"
            currentUserID= {props.currentUserID}
            wordToSearch = {props.wordToSearch}
            hashtagSearch={true}
        />
   </main>
);

export default HashTagSearch;