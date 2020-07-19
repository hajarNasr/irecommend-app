import React from 'react';
import { withRouter, Link } from 'react-router-dom';
import FollowObj from './FollowObj';
import { followingData } from '../store/actions/authActions';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import '../css/follow-obj.css';

class Following extends React.Component{
    componentDidMount(){
        this.props.getFollowing(this.props.match.params.username);
    }
    getFollowing = (data)=>(
        data.map(following=>
            <div key={following.pk} className="all-following">
               <Link to={`/${following.username}/`}><FollowObj obj={following}/></Link>
            </div>   
        )
    );
    render(){
        return(
            <div> 
                {this.props.isFollowingDataReady?
                    this.props.followingData.length?
                        <div>
                            <div className="followers-header"> People followed by {this.props.match.params.username}</div>
                            {this.getFollowing()}
                        </div>
                    :
                    <div className="m-auto">{this.props.match.params.username} is not following anyone yet!</div>  
                :
                <div className="m-auto"><Spinner/></div>
                }
            </div>
        );
}
}

const mapStateToProps = state =>({
    isFollowingDataReady: state.isFollowingDataReady,
    followingData: state.followingData,
});

const mapDispatchToProps = dispatch =>({
    getFollowing: (username)=> dispatch(followingData(username)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Following));