import React from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import RecommendTextBox from '../components/RecommendTextBox';
import Recommendation from './Recommendation';
import * as actions from '../store/actions/authActions';
import '../css/user-recommendations.css';

class HomeRecommendations extends React.Component{
    componentDidMount(){
        this.props.getHomeRecommendation(this.props.userID);
    }
    componentWillUnmount(){
        this.props.onCompnentWillMount();
    }
    createNewRecommendation = (newRecommendation) =>{
        this.props.onSubmittingNewRecommendation(newRecommendation);
    }
    goToRecommendationDetails = (obj) =>{
         this.props.onGettingRecommendationDetails(obj.id, this.props.history);
    }
    getRecommedationsData = (recommendations)=>(
       recommendations.map(obj=>
           <div key={obj.id}>
              <Recommendation obj={obj}
                              currentUserID = {this.props.userID}
                              comments_count = {obj.comments_count}/>
           </div>
        )
    );
    render(){
        return( 
            this.props.isHomeRecommendationsReady?
              <div>
                  <RecommendTextBox userID={this.props.userID}
                    handleRecommendSubmitBtn = {this.createNewRecommendation} />
                 {this.getRecommedationsData(this.props.latestRecommendations)}
              </div>
            :
              <div>Spinner Should be here</div>  
        );
    }
}

const mapStateToProps = state =>({
    isHomeRecommendationsReady: state.isHomeRecommendationsReady,
    latestRecommendations: state.latestRecommendations,
    newRecommendation: state.newRecommendation,
});

const mapDispatchToProps = dispatch =>({
    getHomeRecommendation: (pk) => dispatch(actions.homeRecommendationsAction(pk)),
    onSubmittingNewRecommendation: (newRecommendation) => 
                                 dispatch(actions.submittingNewRecommendation(newRecommendation)),
    onCompnentWillMount: ()=>dispatch(actions.recommendationNotReady()),                             
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HomeRecommendations));