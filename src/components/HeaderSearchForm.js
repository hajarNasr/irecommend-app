import React from 'react';
import { FaSearchIcon } from './FaIcons';
import { withRouter } from 'react-router-dom';

const HeaderSearchForm = (props)=>{
    const handleHeaderSearchSubmit = (e)=>{
        e.preventDefault();
        const wordToSearch = e.target.elements["word-to-search"].value;
        props.history.push(`/search/${wordToSearch}/`);
        e.target.elements["word-to-search"].value = "";
    }
    return(
        <form className="header-search-form" onSubmit={handleHeaderSearchSubmit}>
        <label htmlFor="header-search-form-input" className="header-search-form-label">
            <FaSearchIcon/>
        </label>
         <input
            className = "header-search-form__text-input"
            name = "word-to-search"
            type="text"
            id="header-search-form-input"
            placeholder = "Search iRecommend"
        /> 
    </form>
    );
}

export default withRouter(HeaderSearchForm);