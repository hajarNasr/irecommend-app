import React from 'react';
import NavigationButton from '../components/NavigationButton';
import { handleMainNavClick } from '../helpers/HomeClickActions';
import '../css/home-sections.css';

const MainNavigation = ()=>{
    return(
        <div className="main-navigation">
             <NavigationButton navdata = "1" onClick={handleMainNavClick} id="nav-1" navActiveClass="active-nav" />
             <NavigationButton navdata = "4" onClick={handleMainNavClick} id="nav-4"/>
        </div>
    );
}

export default MainNavigation;