import React from 'react';
import FollowObj from './FollowObj';
import { connect } from 'react-redux';
import { followersData } from '../store/actions/authActions';
import { withRouter, Link } from 'react-router-dom';
import '../css/follow-obj.css';

class Followers extends React.Component{
    componentDidMount(){
        this.props.getFollowers(this.props.match.params.username);
    }
    getFollowers = ()=>(
        this.props.followersData.map(follower=>
          <div key={follower.pk} className="all-followers">
               <Link to={`/${follower.username}/`}><FollowObj obj={follower}/></Link>
          </div>  
        )
    );
    render(){
        return(
            <div>
               <div className="followers-header">{this.props.match.params.username}'s followers</div>
                {this.props.isFollowersDataReady &&
                <div>
                 {this.getFollowers()}
                </div>}
            </div>
        );
}
}

const mapStateToProps = state =>({
    isFollowersDataReady: state.isFollowersDataReady,
    followersData: state.followersData,
});

const mapDispatchToProps = dispatch =>({
    getFollowers: (username)=> dispatch(followersData(username)),
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Followers));