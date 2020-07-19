import React from 'react';
import Dashboard from './Dashboard';
import '../css/loggedin-home.css';

const LoggedinHome = (props)=>(
    <main className="loggedin-home-wrapper"> 
        <Dashboard 
                timeStamp = {props.timeStamp}
                currentUserID={props.currentUserID}/>
    </main>
);

export default LoggedinHome;