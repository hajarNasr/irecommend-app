import React from 'react';

const SubmitBtn = (props)=>{
    return(
        <button
            className={props.className}
            id = {props.id}
            type="submit">
            {props.btnText}
        </button>
    );
}

export default SubmitBtn;