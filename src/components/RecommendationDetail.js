import React from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { recommendationDetails, 
        updateRecommendation,
        deleteRecommendation,
        submitNewComment } from '../store/actions/authActions';
import Recommendation from './Recommendation';
import CommentForm from './CommentForm';
import { fixDate } from '../helpers/functions';
import { FaPencilIcon } from './FaIcons';
import Spinner from './Spinner';
import {ROOT_URL} from '../helpers/urls';
import '../css/recommendationDetail.css';

class RecommendationDetail extends React.Component{
    componentDidMount(){;
        this.props.onGettingRecommendationDetails(this.props);
    }
    handlecreatingNewComment = (newComment)=>{
        this.props.onSubmittingNewComments(newComment);
    }
    handleDeleteRecommendation = (recomID) =>{
        this.props.onDeleteRecommendation(recomID, this.props.history);
     }
     handleUpdateRecommendation = (updatedRecom) =>{
        this.props.onUpdateRecommendation(updatedRecom);
     }
    getComents = ()=>(
        this.props.comments.map(obj=>
            <div key={obj.id} className="recom-wrapper comment-wrapper">
                 <div className="commenter-profile-img">
                      <img src={`${ROOT_URL}${obj.commenter.profile_img}`}
                           alt="" />
                </div>
                <div className="comment-obj"> 
                    <div className="fullname-and-handler m-0">
                       <div>{obj.commenter.full_name}</div>
                       <div><Link to={`/${obj.commenter.username}/`}>@{obj.commenter.username}</Link></div>
                       <div className="comment-content">{obj.comment_content}</div>
                       <div className="comment-created_on">{fixDate(obj.created_on)}</div>
                    </div>
                </div>
            </div>
        ) 
    );
    state={
        isLeaveAComment: false,
    }
    toggleCommentForm = () =>{
        this.setState({isLeaveAComment:!this.state.isLeaveAComment});
    }
    render(){
        return(
              this.props.recommendationDetailsReady?
              <div style={{minHeight:'79vh'}}>
                  <Recommendation obj={this.props.recommendation}
                                  isFullContent = {true}
                                  currentUserID = {this.props.currentUserID}
                                  comments_count= {this.props.comments_count}
                                  onDeleteRecommendation = {this.handleDeleteRecommendation}
                                  onUpdateRecommendation = {this.handleUpdateRecommendation}
                  />
                  <div className="leave-a-comment">
                      <span onClick={this.toggleCommentForm}><FaPencilIcon/> Leave a comment</span>
                  </div>
                  { this.state.isLeaveAComment&&
                  <CommentForm 
                            recommendationID={this.props.recommendation.id}
                            profileImg = {this.props.currentUserProfileImg}
                            handleNewCommentSubmitBtn = {this.handlecreatingNewComment}/>
                   }         
                         
                  {this.getComents()}
              </div>
              :
              <div className="m-auto"><Spinner/></div>
        );
    }
}
const mapStateToProps = state =>({
    recommendationDetailsReady: state.recommendationDetailsReady,
    recommendation: state.recommendation,
    comments: state.comments,
    comments_count: state.comments_count,
});

const mapDispatchToProps = dispatch =>({
    onGettingRecommendationDetails: (props)=> 
                       dispatch(recommendationDetails(props)),  
    onSubmittingNewComments: (newComment) =>
                       dispatch(submitNewComment(newComment)),     
    onDeleteRecommendation: (recomID, history)=> dispatch(deleteRecommendation(recomID,history)), 
    onUpdateRecommendation: (updatedRecom)=>dispatch(updateRecommendation(updatedRecom)),              
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendationDetail));