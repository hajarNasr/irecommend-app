import React from 'react';
import { connect } from 'react-redux';
import { getNotifications, loadMoreNotifications, markNotificationAsSeen } from '../store/actions/authActions';
import { Link } from 'react-router-dom';
import {ROOT_URL} from '../helpers/urls';
import Spinner from './Spinner';
import '../css/notifications.css';

class Notifications extends React.Component{
    componentDidMount(){
        this.props.onNotificationsSeen(this.props.currentUserID);
        window.addEventListener("scroll", this.onScroll);
    }
    componentWillMount(){
        this.props.onGettingNotifications(this.props.currentUserID);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }
    scrollRef = React.createRef();
    state = {
        displayUpBtn:false,
        scrollPos:0,
        offset:10,
        unread:"unread",
    }
    checkScroll = () =>{
        if(this.state.scrollPos > 0 && this.state.scrollPos > (this.scrollRef.current.offsetTop - 500)){
            this.setState({displayUpBtn:true})
           if(this.props.next){
               this.props.onLoadingMoreNotifications(this.props.currentUserID, this.state.offset);
               this.setState({currentPage:this.state.offset+10});
            }
        }
        else{
            this.setState({displayUpBtn:false});
         }          
    }
    onScroll = (e)=>{
        this.setState({scrollPos:window.pageYOffset}, this.checkScroll);
    } 

    handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
   } 
    render(){
        return(
            <div ref={this.scrollRef} className="notifications-wrapprer">
               {this.props.notifications &&
                    this.props.notifications.map(obj=>{
                        let unread = obj.seen? "": this.state.unread;
                        return (<div key={`${obj.id}`} className={`notification ${unread}`}>
                            <div className="recom-profile-img">
                                <img src={`${ROOT_URL}${obj.user.profile_img}`}
                                        alt=""
                                />
                            </div>
                            <div>
                                <div>{obj.user.full_name}</div>
                                    <Link to={`/${obj.user.username}/`}>@{obj.user.username}</Link> 
                                    &ensp;{obj.description}
                                    {obj.recommendation?
                                        <Link to={`/${obj.recommendation.user.username}/recommendations/${obj.recommendation.id}`}>
                                        {obj.recommendation.content}...</Link>
                                        :
                                        ""
                                    }
                            </div>
                        </div>)
                    })
                         
                }
               
               {this.props.isLoading && this.props.next &&
                    <div className="m-auto"><Spinner/></div>
                }
                {this.props.count === 0 && 
                    <div className="m-auto">You have no notifications yet!</div>
                } 
            </div>
        )
    }
}

const mapStateToProps = state =>({
   isLoading: state.isLoading,
   notifications: state.notifications,
   next:state.next,
   count: state.count,
});
const mapDispatchToProps = dispatch =>({
    onGettingNotifications: (pk)=> dispatch(getNotifications(pk)),
    onLoadingMoreNotifications: (pk, offset)=> dispatch(loadMoreNotifications(pk, offset)),
    onNotificationsSeen: (pk)=> dispatch(markNotificationAsSeen(pk)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Notifications);