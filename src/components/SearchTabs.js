import React from 'react';
import SearchTab from './SearchTab';
import "../css/search-tabs.css";

class SearchTabs extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
          activeTab: this.props.children[0].props.label,
        };
    }
    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });

    }
    render() {
        const { onClickTabItem, props: { children,}, state: {  activeTab,} } = this;
        return (
            <div className="tabs">
                <ol className="tab-list">
                    {children.map((child) => {
                        const { label } = child.props;
                        return (
                            <SearchTab
                                activeTab={activeTab}
                                key={label}
                                label={label}
                                onClick={onClickTabItem}/>
                        );
                    })}
                </ol>
                <div className="tab-content">
                    {children.map((child) => {
                        if (child.props.label !== activeTab) return null;
                        return child.props.children;
                    })}
                </div>
            </div>
        );
    }    
}

export default SearchTabs;