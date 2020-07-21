import { AuthUrls } from './urls';

export const checkFieldErrors =(errorMessages, field)=>{
    let error;
    if(field === "password2" && errorMessages){
        try {
           error = errorMessages["non_field_errors"]
        }
        catch{
            //pass
        } 
    }
    else{
        try{
            error = errorMessages[field];
        }
        catch{
            error = null;
        }
        
    }
    if(error && error.some(inPasswordErrors)){
        error = "Password must be at least 8 characters, contain only numbers and letters."
    }
    return error;
}

const inPasswordErrors = (element) => ["This password is too short. It must contain at least 8 characters.", "This password is too common.", "This password is entirely numeric."].includes(element);

export const getLink = (parent, param)=>{
    if(parent === "Dashboard"){
       return `${AuthUrls.ALL_FOLLOWING_USERS_RECOMMENDATIONS}/${param}/?limit=5&offset=`;
    }
    else if(parent === "UserRecommendations"){
       return `${AuthUrls.ALL_USER_RECOMMENDATIONS}/${param}/?limit=5&offset=`
    }
    else if(parent === "userLikes"){
        return `${AuthUrls.USER_LIKES}/${param}/?limit=5&offset=`
    }
    else if(parent === "HashTagSearch"){
        return `${AuthUrls.HASHTAG_SEARCH_URL}/${param}/?limit=5&offset=`
    }
}

export const fixDate = (value)=>{
    const dotIndex = value.indexOf(".");
    const newDate = value.replace(/[A-Za-z]/gi, " ").slice(0, dotIndex-3).split(" ");
    let date = newDate[0].split("-");
    date = `${date[2]}-${date[1]}-${date[0]} ${newDate.slice(newDate.length-1)}`;
    return date;
}

export const checkActionsErrors = (error, history="") =>{
    if(error.response && history){
        if(error.response.status===404){
           history.push('/404/not-found/');
        }
        else {
            if(error.response===401){
                history.push('/unauthorized-access/');
            }
            console.log(error.response)
        }
    }
    else{
        console.log(error.response.data)
    }
}

export const getCloudinaryLink = (img)=>{
    const formData = new FormData();
    formData.append("file", img);
    formData.append('upload_preset', 'sv0oekek');
    return formData;
}