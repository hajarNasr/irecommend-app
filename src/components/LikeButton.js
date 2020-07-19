import React from 'react';
import { connect } from 'react-redux';
import { FaHeartIcon, RedHeartIcon } from './FaIcons';
import {unlikeRecommendation, likeRecommendation } from '../store/actions/authActions';

class LikeButton extends React.Component{
    handleLikeButtonClick = ()=>{
        if(!this.state.isLiked){
           this.props.onLike(this.props.recommendationID, this.props.userID);
           this.setState({isLiked: true, likes:this.state.likes+1})
        }
        else{
           this.props.onUnlike(this.props.recommendationID, this.props.userID);
           this.setState({isLiked:false, likes:this.state.likes-1})
        }   
    }
    state = {
        isLiked:this.props.isLiked,
        likes:this.props.likesCount,
    }
    render(){
        return(
            <div className="like-btn-wrapper">
                <span>{this.state.likes ===0?"":this.state.likes}</span>
                <button onClick={this.handleLikeButtonClick} id="like-btn">
                    {this.state.isLiked?
                        <RedHeartIcon/>
                        :
                        <FaHeartIcon/>
                    }
                </button>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch =>({
    onLike: (recommendationID, userID) => dispatch(likeRecommendation(recommendationID,userID)),
    onUnlike:(recommendationID, userID) => dispatch(unlikeRecommendation(recommendationID,userID)),
});
export default connect(null, mapDispatchToProps)(LikeButton);