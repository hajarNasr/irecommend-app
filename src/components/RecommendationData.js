import React from 'react';
import Recommendation from './Recommendation';

class RecommendationData extends React.Component{
  render(){
    return(
      <div onScroll={this.props.onScroll}>
        {
          this.props.recommendations.map(obj=>
              <div key={obj.id}>
                <Recommendation obj={obj}
                                currentUserID = {this.props.currentUserID}
                                onDeleteRecommendation = {this.props.onDeleteRecommendation}
                                onUpdateRecommendation = {this.props.onUpdateRecommendation}
                                comments_count = {obj.comments_count}/>
            </div>)
        }
      </div>
    );
    }
  }    
export default RecommendationData;