import React from 'react';
import { FaUserIcon, FaHomeIcon, FaBellIcon } from '../components/FaIcons';  
import { logout, getNewNotificationsCount } from '../store/actions/authActions';  
import HeaderSearchForm  from '../components/HeaderSearchForm'; 
import {Link , withRouter} from 'react-router-dom';
import { connect } from 'react-redux';         
import '../css/loggedin-header.css';


class LoggedinHeader extends React.Component{
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
        this.props.checkNewNotifications(this.props.currentUserID);
    }
 
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
    
    handleLogoutClick = (e)=>{
        e.preventDefault();
        this.props.onLogout(this.props.history);
        this.props.history.push("/");
    }

    handleClickOutside = event => {
        this.getNewNotifications();
        if (this.container.current && !this.container.current.contains(event.target)) {
          this.setState({
            displayHeaderMenu: false,
          });
        }
      };
     container = React.createRef();
     state = {
         displayHeaderMenu: false,
     }
     
     toggleDropdownMenu = () =>{
        this.getNewNotifications();
         this.setState({displayHeaderMenu:!this.state.displayHeaderMenu})
     }
     getNewNotifications = ()=>{
        this.props.checkNewNotifications(this.props.currentUserID);
     }
     clearNotificationsCount =()=>{
         document.getElementById("notifi-count").innerHTML=""
     }
     hideMenu = () =>{
         this.setState({displayHeaderMenu: false});
     }
     render(){
        const logo = require('../images/logo.png');
        let {notificationsCount} = this.props;
        return( 
            <header className="loggedin-header-wrapper">
             
                <div className="loggedin-header-wrapper__content">
                <div className="loggedin-header-left">
                    <div className="loggedin-header-logo">
                    <Link to="/home/">
                        <img src={logo}
                        alt="logo"/>
                    </Link></div>
                     <HeaderSearchForm/>
                </div>
                
                <div className="loggedin-header-right" > 
                    <Link to="/home/" onClick={this.getNewNotifications}><FaHomeIcon/></Link>
                    <div style={{"position":"relative"}}>
                        <div className="notifi-count" id="notifi-count">
                            {notificationsCount >= 1?
                                notificationsCount
                                :
                                ""
                            }
                        </div>
                        <Link to="/notifications/" onClick={this.clearNotificationsCount}><FaBellIcon/></Link>
                    </div>
                    
                    <div ref={this.container}>
                        <FaUserIcon onClick={this.toggleDropdownMenu} />
                        { this.state.displayHeaderMenu &&
                          <ul className="header-dropdown-menu">
                              <li><Link to={`/${this.props.currentUser}/`} onClick={this.hideMenu}>
                                     {this.props.currentUser}
                               </Link></li>
                              <li><Link to="/profile/settings/" onClick={this.hideMenu}>Settings</Link></li>
                              <li><button onClick={this.handleLogoutClick}>Log out</button></li>
                          </ul>
                        }
                    </div>
                </div>
                </div>
            </header>
     );
}
}

const mapStateToProps = state =>({
    notificationsCount: state.notificationsCount,
});

const mapDispatchToProps = dispatch => ({
     onLogout: (history) => dispatch(logout(history)),
     checkNewNotifications: (pk)=>dispatch(getNewNotificationsCount(pk)), 
});
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(LoggedinHeader));