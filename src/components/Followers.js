import React from 'react';
import FollowObj from './FollowObj';
import Spinner from './Spinner';
import { connect } from 'react-redux';
import { followersData } from '../store/actions/authActions';
import { withRouter, Link } from 'react-router-dom';
import '../css/follow-obj.css';

class Followers extends React.Component{
    componentDidMount(){
        this.props.getFollowers(this.props.match.params.username);
    }
    getFollowers = (data)=>(
            data.map(follower=>
                    <div key={follower.pk} className="all-following">
                        <Link to={`/${follower.username}/`}><FollowObj obj={follower}/></Link>
                    </div> 
            )
    )

    render(){
        return(
            <div>
                {this.props.isFollowersDataReady?
                    this.props.followersData.length?
                        <div>
                            <div className="followers-header">{this.props.match.params.username}'s followers</div>
                            {this.getFollowers(this.props.followersData)}
                       </div>
                       :
                       <div className="m-auto">
                       {console.log(this.props.followersData)}
                       No one is following {this.props.match.params.username} yet!
                       </div>
                :
                <div className="m-auto"><Spinner/></div>  
                }
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