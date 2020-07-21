import React from 'react';
import {searchPeople } from '../store/actions/authActions';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import  FollowObj from './FollowObj';
import Spinner from './Spinner';

class PeopleSearch extends React.Component{
    componentDidMount(){
        this.props.getSearchData(this.props.wordToSearch);
    }

    getPeople = (people)=>(
            people.map(person=>
            <div key={person.pk} className="all-following">
               <Link to={`/${person.username}/`}><FollowObj obj={person}/></Link>
            </div>   
        )
    );
    render(){
        return(
            this.props.isPeopleSearchResultReady?
                <div className="people-search-wrapper">
                   {this.props.peopleSearchData.length?
                      this.getPeople(this.props.peopleSearchData)
                      :
                      <div className="m-auto does-not-exist">The user you're looking for doesn't exist.</div>
                   }
                </div>
            :
            <div className="m-auto"><Spinner/></div> 
        );
    }
}

const mapStateToProps = state =>({
    isPeopleSearchResultReady: state.isPeopleSearchResultReady,
    peopleSearchData: state.peopleSearchData,
 });
 
 const mapDispatchToProps = disptch =>({
     getSearchData: (wordToSearch) => disptch(searchPeople(wordToSearch)),
 });

export default connect(mapStateToProps, mapDispatchToProps)(PeopleSearch);