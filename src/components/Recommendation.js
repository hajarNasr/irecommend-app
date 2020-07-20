import React from 'react';
import { Link } from 'react-router-dom';
import { FaCommentIcon } from './FaIcons';
import { fixDate } from '../helpers/functions';
import LikeButton from './LikeButton';
import {ROOT_URL} from '../helpers/urls';
import RecommendationPreviewer from './RecommendationPreviewer';
import RcommendationSettings from './RcommendationSettings';

class Recommendation extends React.Component{
    getImgPath =(imgPath)=>{
        let path = require(`../../${imgPath}`);
        return path;
    }
    render(){
        const { obj } = this.props;
        return(
            <div className="recom-wrapper">
                <div className="recom-profile-img">
                    <img src={this.getImgPath(obj.user.profile_img)}
                        alt=""
                    />
                    {console.log(`${obj.user.profile_img}`)}
                </div>
                <div className="name-and-content"> 
                    <div className="fullname-and-handler">
                        <div>{obj.user.full_name}</div>
                        <div><Link to={`/${obj.user.username}/`}>@{obj.user.username}</Link></div>
                        <div className="created_on">{fixDate(obj.created_on)}</div>
                    </div>
                    <div>
                    <RecommendationPreviewer 
                                isFullContent = {this.props.isFullContent}
                                content = {obj.content}
                                className="recom-content"/>
                   <div className="keep-reading">

                   {obj.content.length >= 700 && !this.props.isFullContent &&
                      <Link to={`/${obj.user.username}/recommendations/${obj.id}/`} 
                            >Keep reading...</Link>
                   }  
                   </div>     
                    </div>        
                    
                  <div className="recom-tags">
                         {obj.hashtags.map((tag)=>{
                            if(tag){
                              return <Link to={`/search/${tag}/`} key={`${obj.id} ${tag}`}> {tag}</Link>
                             }
                         })}
                    </div>
                    <div className="likes-and-comments-wapper">
                        <div className="likes-and-comments">
                            <div>
                                <Link to={`/${obj.user.username}/recommendations/${obj.id}/`}> 
                                    {this.props.comments_count>0?
                                    this.props.comments_count:""
                                    } 
                                    <FaCommentIcon/>
                                    </Link>
                            </div>
                            <LikeButton recommendationID = {obj.id}
                                        userID = {this.props.currentUserID}
                                        isLiked = {obj.is_liked}
                                        likesCount = {obj.likes_count}/>
                        </div>
                            {this.props.currentUserID === obj.user.pk  
                                &&  <RcommendationSettings 
                                            recom={obj}
                                            userID = {obj.user.pk}
                                            onUpdateRecommendation = {this.props.onUpdateRecommendation}
                                            onDeleteRecommendation = {this.props.onDeleteRecommendation}/>}
                    </div>
                </div>
        </div>
        );
    }
}
export default Recommendation;