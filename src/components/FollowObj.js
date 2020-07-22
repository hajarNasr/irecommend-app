import React from 'react';

const FollowObj = (props)=>(
    <div className="recom-wrapper">
        <div className="recom-profile-img">
           <img src={`${props.obj.profile_img_url}`}
               alt=""
           />
        </div>
        <div className="name-and-content"> 
            <div className="fullname-and-handler">
                <div>{props.obj.full_name}</div>
                <div>@{props.obj.username}</div>
            </div>  
        </div>
   </div>
);

export default FollowObj;