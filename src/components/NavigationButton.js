import React from 'react';
import '../css/home-sections.css';

const NavigationButton = (props)=>{
    return(
        <button navdata={props.navdata} 
                className={`navigation-btn ${props.navActiveClass}`}
                id={props.id}
                onClick = {props.onClick}>
        </button>
    );
}

export default NavigationButton;