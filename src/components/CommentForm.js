import React from 'react';
import SubmitBtn from './SubmitBtn';


class CommentForm extends React.Component{
    handleCommentFormSubmit = (e)=>{
        e.preventDefault();
        const commentContent = e.target.elements["comment-textarea"].value;
        if(commentContent){
            this.props.handleNewCommentSubmitBtn({
                recommendation:this.props.recommendationID, 
                comment_content:commentContent,
               });
            e.target.elements["comment-textarea"].value = "";
        }
    }
    render(){
        return(
            <div className="comment-form-wrapper">
               <form onSubmit={this.handleCommentFormSubmit} className="comment-form">
                   <div className="comment-form__fist-child">
                        <div className="current-user-profile-img">
                            <img src={`${this.props.profileImg}`}
                                alt="" />
                            </div>
                        <textarea id="comment-textarea" 
                                    name = "comment-textarea"
                                    placeholder="Write something here!"
                                    />
                    </div>         
                   <SubmitBtn
                       btnText = "Comment"
                       className= "comment-submit-btn"
                   />
               </form>
            </div>
        )
    }
}

export default CommentForm