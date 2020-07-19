import React from 'react';
import LoggedoutHome from './LoggedoutHome';
import MainNavigation from './MainNavigation';
import { connect } from 'react-redux';
import { authCheckState } from '../store/actions/authActions';
import {Redirect} from 'react-router-dom';
import '../css/index.css';

class Home extends React.Component{
    componentDidMount() {
        this.props.onTryAutoSignup();
    }
    
    render(){
        return (
            <div className="home-wrapper">
                {this.props.isAthenticated? 
                   <Redirect to="/home/"/>
                    :
                    <div>
                       <LoggedoutHome/>
                       <MainNavigation/>
                    </div>
                }  
            </div>
        );
}
}

const mapStateToProps = state =>({
    isAthenticated: localStorage.getItem('token') !== null,
});

const mapDispachToProps = dispatch =>({
    onTryAutoSignup: ()=> dispatch(authCheckState()),
});

export default connect(mapStateToProps, mapDispachToProps)(Home);