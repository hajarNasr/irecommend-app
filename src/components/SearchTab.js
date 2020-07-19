import React from 'react';

class SearchTab extends React.Component{
    onClick = () =>{
        this.props.onClick(this.props.label);
    }
    render(){
        const { activeTab, label,} = this.props;

        let className = 'tab-list-item';

        if (activeTab === label) {
            className += ' tab-list-active';}

        return(
            <li onClick={this.onClick}
                className={className}>
                {label}
            </li>
        )
    }
}

export default SearchTab;