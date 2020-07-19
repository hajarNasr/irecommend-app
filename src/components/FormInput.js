import React from 'react';
import '../css/from-input-comp.css';

const FormInput = (props) =>{
    return(
        <div className="from-input-comp">
            <label htmlFor={props.id}
                   className={props.labelClassName}>
                {props.label}
            </label>
            <input
                id = {props.id}
                name = {props.name}
                type={props.type}
                defaultValue = {props.defaultValue}
                placeholder = {props.placeholder}
                className = {props.className}/>
        </div>
    );
}

export default FormInput;