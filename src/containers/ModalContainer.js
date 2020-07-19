import React from 'react';
import RecommendationForm from '../components/RecommendationForm';
import Modal from '../components/Modal';
import { FaPencilIcon } from '../components/FaIcons';
import ChangePasswordForm from '../components/ChangePasswordForm';
import DeleteAccountForm from '../components/DeleteAccountForm';

class ModalContainer extends React.Component{
    state = {
        showModal: false,
        clearTags:false,
    }
    showModal = () => {
        this.setState({ showModal: true});
        document.body.classList.add('overflow-none');
    };
      hideModal = () => {
        this.setState({ showModal: false ,  clearTags:true});
        document.body.classList.remove('overflow-none');
        try{
            document.getElementById('recom-text-area').value="";
        }
        catch{
            //pass
        }

        if(this.props.submitBtnTxt === "Update"){
           this.props.hideSettingList()
        }                                         

    };

    render(){
        const isRecommend = this.props.submitBtnTxt === "Recommend";
        return(
            <div>
                <Modal showModal={this.state.showModal} 
                       handleClose={this.hideModal}>
                    {this.props.child === "RecommendationForm" &&
                        <RecommendationForm userID= {this.props.userID}
                            submitBtnTxt = {this.props.submitBtnTxt}
                            recom = {this.props.recom}
                            clearTags = {this.state.clearTags}
                            handleRecommendSubmitBtn = {this.props.createNewRecommendation}
                            handleRecommendUpdateBtn = {this.props.onUpdateRecommendation}
                            hideSettingList = {this.props.hideSettingList}
                            hideModalOnSubmibt = {this.hideModal}/>}
                    {this.props.child === "ChangePasswordForm" &&
                       <ChangePasswordForm/>
                    }         
                    {this.props.child==="DeleteAccountForm" &&
                        <DeleteAccountForm
                            currentUserID = {this.props.currentUserID}
                        />
                    }       
                </Modal>
                {isRecommend?
                    <button type="button" onClick={this.showModal} className={isRecommend?"new-recom-btn":""}>
                    {isRecommend && <FaPencilIcon/>} 
                    </button>
              
                :
                    <span onClick={this.showModal} className="submitBtnTxt">
                        {this.props.submitBtnTxt === "Update"? 
                          "Edit"
                        :
                        this.props.submitBtnTxt}
                    </span>    
                }
            </div>
        );
    }
}

export default ModalContainer;