import React from 'react';

const Editor =(props)=>{
    return(
        <textarea
            id="editor"
            className = {props.className}
            defaultValue={props.defaultValue}
            name= {props.name}
            />
     );
}

export default Editor;