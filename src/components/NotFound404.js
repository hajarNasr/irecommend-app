import React from 'react';

const NotFound404 = ()=>{
    const logo = require('../images/404.png');
    return(<div className="not-found-wrapper">
        <img src={`${logo}`} alt=""/>
    </div>)
}

export default NotFound404;