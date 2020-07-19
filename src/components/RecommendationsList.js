import React from 'react';
import { connect } from 'react-redux';
import {withRouter } from 'react-router-dom';
import { FaUpArrowIcon } from './FaIcons';
import Recommendation from '../components/Recommendation';
import ModalContainer from '../containers/ModalContainer';
import Spinner from './Spinner';
import { getLink } from '../helpers/functions';
import * as actions from '../store/actions/authActions';
import '../css/user-recommendations.css';



class RecommendationsList extends React.Component{
    path = ""
    componentDidMount(){
        const { parent } = this.props;
        switch (parent){
            case "Dashboard":
                this.path = getLink("Dashboard", this.props.currentUserID);
                break;
            case "UserRecommendations":
                this.path = getLink("UserRecommendations", this.props.username); 
                break;
            case "HashTagSearch":
                this.path = getLink("HashTagSearch", this.props.wordToSearch);
                break;
            case  "UserLikes":
                this.path = getLink("userLikes", this.props.username); 
        }        
        this.props.getRecommendations(this.path+"0");
        window.addEventListener("scroll", this.onScroll);
    }
    createNewRecommendation = (newRecommendation) =>{
        this.props.onSubmittingNewRecommendation(newRecommendation);
    }
    handleDeleteRecommendation = (recomID) =>{
       this.props.onDeleteRecommendation(recomID);
    }
    handleUpdateRecommendation = (updatedRecom) =>{
       this.props.onUpdateRecommendation(updatedRecom);
    }
    componentWillUnmount() {
        window.removeEventListener("scroll", this.onScroll);
    }

    state = {
        displayUpBtn:false,
        scrollPos:0,
        currentPage:5,
    }

    scrollRef = React.createRef();

    checkScroll = () =>{
        if(this.state.scrollPos > 0 && this.state.scrollPos > (this.scrollRef.current.offsetTop - 500)){
            this.setState({displayUpBtn:true})
           if(this.props.next !== null){
               this.props.loadMoreRecommnendations(this.path + `${this.state.currentPage}`);
               this.setState({currentPage:this.state.currentPage+5});
            }
        }
        else{
            this.setState({displayUpBtn:false});
         }          
    }
    onScroll = (e)=>{
        this.setState({scrollPos:window.pageYOffset}, this.checkScroll);
    } 

    handleScrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
   } 

    render(){
        let {latestRecommendations} = this.props;
        return(
            <div ref={this.scrollRef} style={{"paddingBottom":'50px'}}>
                {["Dashboard","UserRecommendations"].indexOf(this.props.parent)!==-1 && this.props.isCurrentUser &&
                    <ModalContainer 
                        userID= {this.props.currentUserID}
                        submitBtnTxt = "Recommend"
                        child = "RecommendationForm"
                        createNewRecommendation={this.createNewRecommendation}/>}  
                {this.props.latestRecommendations &&
                        <div>
                            {latestRecommendations.map(obj=>
                                <div key={`${obj.id}`}>
                                    <Recommendation 
                                        obj={obj}
                                        currentUserID = {this.props.currentUserID}
                                        onDeleteRecommendation = {this.handleDeleteRecommendation}
                                        onUpdateRecommendation = {this.handleUpdateRecommendation}
                                        comments_count = {obj.comments_count}/>
                                </div>)
                           }
                        </div>}
                        
                        {this.props.isLoading && this.props.next &&
                            <div className="m-auto"><Spinner/></div>
                        }

                        {(this.props.count === 0) && 
                          <div className="m-auto does-not-exist">No recommendations to show yet!</div>
                        }  

                {this.state.displayUpBtn && 
                   <button className="up-btn"
                           onClick={this.handleScrollToTop}>
                       <FaUpArrowIcon/>
                   </button>
                }
           </div>
        );
    }
}

const mapStateToProps = state =>({
    areRecommendationsReady: state.areRecommendationsReady,
    latestRecommendations: state.latestRecommendations,
    newRecommendation: state.newRecommendation,
    isLoading: state.isLoading,
    count: state.count,
    next:state.next,
});

const mapDispatchToProps = dispatch =>({
    getRecommendations: (pk) => dispatch(actions.getRecommendationsList(pk)),
    loadMoreRecommnendations: (pk,page)=>dispatch(actions.loadMoreRecommendation(pk,page)),
    onSubmittingNewRecommendation: (newRecommendation) => 
                                 dispatch(actions.submittingNewRecommendation(newRecommendation)),
    onDeleteRecommendation: (recomID)=> dispatch(actions.deleteRecommendation(recomID)), 
    onUpdateRecommendation: (updatedRecom)=>dispatch(actions.updateRecommendation(updatedRecom)),                         
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RecommendationsList));