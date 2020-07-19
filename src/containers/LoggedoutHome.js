import React from 'react';
import HomeSectionOne from './HomeSectionOne';
import HomeSectionFour from './HomeSectionFour';

const LoggedoutHome = () =>{
    return(
        <div className="home-sections">
             <HomeSectionOne   id="home-section-1" sectionActiveClass="active-section"/> 
             <HomeSectionFour  id="home-section-4"/> 
        </div>
    );
}

export default LoggedoutHome;