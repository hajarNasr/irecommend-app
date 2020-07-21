import React from 'react';
import FormInput from './FormInput';
import SubmitBtn from './SubmitBtn';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { FaCameraIcon } from './FaIcons';
import { EditUserProfileAction} from '../store/actions/authActions';
import '../css/eidt-user-profile.css';

class EditUserProfile extends React.Component{
   /*  componentWillReceiveProps (nextProps){
       if (this.props !== nextProps) {
            this.setState({profileImgSrc:nextProps.profileData["profile_img_url"], 
                headerImgSrc:nextProps.profileData["header_img_url"]});
       }
    } */
    state = {
        profileImg:'',
        headerImg: '',
        profileImgSrc: this.props.profileData.profile_img,
        headerImgSrc: this.props.profileData.header_img,
    }

    handleEditUserProfileSubmit = (e) =>{
        e.preventDefault();
        const formElements = e.target.elements;
 
        const editProfileValues = {
            username: formElements.username.value,
            fullName: formElements['full_name'].value,
            about: formElements.about.value,
            website: formElements.website.value,
            location: formElements.location.value,
            profileImg: this.state.profileImg,
            headerImg: this.state.headerImg,
            history: this.props.history
        }
        this.props.onUpdatUserProfile(editProfileValues);
    }
    
    handleProfileImgeUpload = (e)=>{
        const file = e.target.files[0];
        if(file){
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) =>{
                this.setState({profileImg:file, profileImgSrc:reader.result})
            }
        }
    }

    handleHeaderImgeUpload = (e)=>{
        const file = e.target.files[0];
        if(file){
            let reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = (e) =>{
                this.setState({headerImg:file, headerImgSrc:reader.result})
            }
        }
    }
    render(){
        const userData = this.props.profileData;
        return(
            <div className="profile-wrapper">
                <div>
                    <form onSubmit={this.handleEditUserProfileSubmit} encType="multipart/form-data" 
                        className="profile-content "
                        multiple = {false}> 
                        <div className="profile-content__images">
                            <div style={{ backgroundImage: `url(${this.state.headerImgSrc})`}}
                                className="profile-content__header-img">
                                    <label className="pos-abs input-file-type">
                                    <FaCameraIcon/>
                                    <input 
                                        name = "headerImg"
                                        type="file" 
                                        accept="image/*"
                                        style={{display:'none'}}
                                        onChange={this.handleHeaderImgeUpload}/> 
                                </label>     
                            </div>        
                            <div style={{ backgroundImage: `url(${this.state.profileImgSrc})`}}
                                className="profile-content__profile-img">
                                 {console.log(this.state.profileImgSrc)}
                                <label className="pos-abs input-file-type ">
                                    <FaCameraIcon/>
                                    <input 
                                        name = "profileImg"
                                        type="file" 
                                        accept="image/*"
                                        style={{display:'none'}}
                                        onChange={this.handleProfileImgeUpload}/> 
                                </label>    
                            </div>      
                        </div>            
                        <div className="edit-profile-inputs">
                            <FormInput 
                                name = "full_name"
                                type="text" 
                                defaultValue = {userData["full_name"]}
                                className = "edit-form-input-field"
                                labelClassName="edit-form-label"
                                label="First Name"/> 
                            <FormInput 
                                name = "username"
                                type="text" 
                                defaultValue = {userData.username}
                                labelClassName="edit-form-label"
                                className = "edit-form-input-field"
                                label="Username"/>
                            <div className="edit-profile-textarea-container">
                                <label htmlFor="about" 
                                        className="edit-form-label">
                                        About
                                </label>   
                                <textarea name="about" className="about-textarea"
                                        defaultValue = {userData.about}>
                                </textarea>
                            </div> 

                            <FormInput 
                                name = "location"
                                type="text" 
                                defaultValue = {userData.location}
                                className = "edit-form-input-field"
                                labelClassName="edit-form-label"
                                label="location"/> 
                            <FormInput 
                                name = "website"
                                type="text" 
                                defaultValue = {userData.website}
                                className = "edit-form-input-field"
                                labelClassName="edit-form-label"
                                label="Website"/> 
                            </div> 
                        <SubmitBtn
                            btnText = "Update"
                            type = "submit"
                            className = "edit-profile-submit-btn"
                        /> 
                        
                    </form>
                </div>   
            </div>
        );
      }
}

const mapDispatchToProps = dispatch => ({
     onUpdatUserProfile: (editProfileValues) => dispatch(EditUserProfileAction(editProfileValues)),
});
export default withRouter(connect(null, mapDispatchToProps)(EditUserProfile));