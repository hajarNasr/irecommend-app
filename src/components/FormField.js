import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextFiled from '@material-ui/core/TextField';
import { checkFieldErrors } from '../helpers/functions';


const FormField = (props)=>{
    const { classes } = props;
    return(
      <div className="form-field">
        <TextFiled 
            id= {props.id} 
            type= {props.type}
            name = {props.name}
            className="w-100"
            label={props.label}
            InputProps={{className: classes.underline}}
            InputLabelProps = {{className:classes.label}}
            defaultValue = {props.defaultValue}
            />
        <div className="error-msg">{checkFieldErrors(props.errorMsgs, props.name)}</div>    
      </div>      
    );
}

export const styles = theme => ({
    underline: {
       padding:'5px',
       color: 'rgb(63, 60, 60)',
      '&:before': {
        borderBottomColor: 'white',
      },
      '&:after': {
        borderBottomColor: 'white',
      },
      '&:hover:before': {
        borderBottomColor: ['white', '!important'],
      },
      '& :-webkit-autofill': {
        '-webkit-text-fill-color': 'rgb(63, 60, 60)',
        '-webkit-box-shadow': '0 0 0px 1000px #000000000 inset',
        'transition': 'background-color 5000s ease-in-out 0s',
      },
    },
    label:{
        color:'white',
        '&.Mui-focused':{
            color:'white'
        }
    }
  });

  export default withStyles(styles)(FormField);