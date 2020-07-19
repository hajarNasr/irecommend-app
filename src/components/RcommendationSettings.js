import React from 'react';
import { FaCogs, FaPencilIcon, FaTrashIcon } from './FaIcons';
import '../css/recom-settings-menu.css';
import ConfirmationModal from './ConfirmationModal';
import Modal from './Modal';
import ModalContainer from '../containers/ModalContainer';

class RcommendationSettings extends React.Component{
    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }
      componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }
  
    handleClickOutside = event => {
        if (this.container.current && !this.container.current.contains(event.target)) {
          this.setState({
            displayRecomSettingsMenu: false,
          });
        }
      };
     container = React.createRef();

     state = {
         displayRecomSettingsMenu: false,
         showModal: false,
     }
    
    toggleRecomSettingsMenu = () =>{
        this.setState({displayRecomSettingsMenu:!this.state.displayRecomSettingsMenu})
    };
    
    onDeleteRecommendation = ()=>{
      console.log(this.props)
      this.props.onDeleteRecommendation(this.props.recom.id);
      this.setState({showModal:false});
   }

    showModal = () => {
      this.setState({ showModal: true, displayRecomSettingsMenu:false });
    };

    hideModal = () => {
      this.setState({ showModal: false, displayRecomSettingsMenu:false});
    };

    render(){
        return(
            <div ref={this.container} className="recom-settings-wrapper">
            <FaCogs onClick={this.toggleRecomSettingsMenu}/>
            {this.state.displayRecomSettingsMenu &&
                <ul className="recom-settings-menu">
                    <li > <FaPencilIcon/> &nbsp;  
                        <ModalContainer userID= {this.props.userID}
                                        submitBtnTxt= "Update"
                                        child ="RecommendationForm"
                                        hideSettingList = {this.hideModal}
                                        onUpdateRecommendation = {this.props.onUpdateRecommendation}
                                        recom = {this.props.recom}/>
                    </li>
                    <li onClick={this.showModal}> <FaTrashIcon/>&nbsp;Delete</li>
                </ul>
              }
              <Modal showModal={this.state.showModal} handleClose={this.hideModal}>
                  <ConfirmationModal
                    hideModal = {this.hideModal}
                    onDeleteRecommendation={this.onDeleteRecommendation}/>
              </Modal>
              </div>
        );
    }
}

export default RcommendationSettings;