import React from 'react';
import SearchTabs from './SearchTabs';
import PeopleSearch from './PeopleSearch';
import HashTagSearch from './HashTagSearch';
import {withRouter} from 'react-router-dom';

class SearchResult extends React.Component{
    render(){
        const { wordToSearch } = this.props.match.params;
        return(
            <div className="search-tab-wrapper">
                <SearchTabs>
                    <div label="Recommendations">
                        <HashTagSearch wordToSearch= {wordToSearch}
                                        currentUserID={this.props.currentUserID}/>
                    </div>
                    <div label="People">
                        <PeopleSearch wordToSearch= {wordToSearch}/>
                    </div>
                </SearchTabs>      
            </div>
        );
    }
}

export default withRouter(SearchResult);