import React from 'react';

class ScrollComponent extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            photos: [],
            loading: false,
            page: 0,
            prevY: 0
        }
    }
    render(){
        return(
            <div className="container">

            </div>
        );
    }
}

export default ScrollComponent;