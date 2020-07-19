import React from 'react';
import * as fa from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import '../css/fa-icons.css';

export const FaEyeIcon = (props)=>(
    getFontAwesomeIcon(fa.faEye, "show-password", props)
);
export const FaEyeSlashIcon = (props)=>(
     getFontAwesomeIcon(fa.faEyeSlash, "show-password", props)
);

export const FaSearchIcon = ()=>(
     getFontAwesomeIcon(fa.faSearch, "fa-search-icon")
);

export const FaUserIcon = (props)=>(
    getFontAwesomeIcon(fa.faUser, "fa-user-icon icon-color", props)
);

export const FaHomeIcon = ()=>(
    getFontAwesomeIcon(fa.faHome, "fa-home-icon icon-color")
);

export const FaBellIcon = ()=>(
    getFontAwesomeIcon(fa.faBell, "fa-bell-icon icon-color")
);

export const FaHeartIcon = (props)=>(
    getFontAwesomeIcon(fa.faHeart,"fa-heart-icon", props)
);

export const RedHeartIcon = (props)=>(
    getFontAwesomeIcon(fa.faHeart,"red-heart-icon", props)
);

export const FaLinkIcon = ()=>(
    getFontAwesomeIcon(fa.faLink, "fa-link-icon")
);

export const FaLocationIcon = ()=>(
    getFontAwesomeIcon(fa.faMapMarker, "fa-location-icon")
);

export const FaCameraIcon = ()=>(
    getFontAwesomeIcon(fa.faCamera, "fa-camera-icon")
);

export const FaCogs = (props)=>(
    getFontAwesomeIcon(fa.faCogs, "fa-cogs-icon",props)
);

export const FaCogIcon = ()=>(
    getFontAwesomeIcon(fa.faCog, "fa-cog-icon")
);

export const FaTrashIcon = ()=>(
    getFontAwesomeIcon(fa.faTrash, "fa-trash-icon")
);

export const FaCommentIcon = ()=>(
    getFontAwesomeIcon(fa.faComment, "fa-comment-icon")
);

export const FaCloseIcon = () =>(
    getFontAwesomeIcon(fa.faTimes, "fa-comment-icon")
);

export const FaPencilIcon = () =>(
    getFontAwesomeIcon(fa.faPen, "")
);

export const FaUpArrowIcon = (props) =>(
    getFontAwesomeIcon(fa.faAngleDoubleUp, "fa-arrow-up-icon", props)
);
const getFontAwesomeIcon = (faIcon, theClassName, props="")=>(
    <FontAwesomeIcon icon = {faIcon} 
               className = {theClassName}
               onClick   = {props.onClick}/>
);
