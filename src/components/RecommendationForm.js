import React from 'react';
import SubmitBtn from './SubmitBtn';
import TagsInput from './TagsInput';
import TextareaAutosize from 'react-textarea-autosize';
import '../css/recommend-text-box.css';

const RecommendationForm = (props)=>{
    const handleRecommendSubmitBtn = (e) =>{
        e.preventDefault();
        const formElements = e.target.elements;
        const content = formElements["recommendation-content"].value;
        const tagsItems = Array.from(document.querySelectorAll('#tags-list>li'))
        const tags = tagsItems.map(tag=>tag.textContent.trim().replace(/[#|,]/g,""))
                              .filter(item=>item.length);
                              

        const newRecommendation = {
            owner: props.userID,
            content: content,
            hashtags: tags,
        }
        if(content) {
            if(props.submitBtnTxt === "Recommend"){
               props.handleRecommendSubmitBtn(newRecommendation);
            }
            else{
               const updatedRecommendation = {id:props.recom.id,...newRecommendation} 
               props.handleRecommendUpdateBtn(updatedRecommendation);
               props.hideSettingList();
            }
            props.hideModalOnSubmibt();
            formElements["recommendation-content"].value = "";
        } 
    }  
    let recom = {};
    if(props.recom){
        recom = props.recom;
    }
    return(
        <div className="recommend-textbox-wrapper">
            <form className = "recommend-textbox-form"
                  onSubmit = {handleRecommendSubmitBtn}>
               <TextareaAutosize 
                    id="recom-text-area"
                    className = "recommend-submit-textarea"
                    defaultValue = {recom.content}
                    placeholder = "Recommend something here..."
                    name="recommendation-content"
                />    
                <TagsInput 
                       clearTags = {props.clearTags}
                       tags = {recom.hashtags? recom.hashtags:[]}/> 
                <div className="info">
                    <p>- Click enter to submit tags or backspace to update them.</p>
                    <p>- Markdown is allowed</p>
                </div> 
                <SubmitBtn
                    className = "recommend-submit-btn"
                    btnText = {props.submitBtnTxt}
                />
            </form>
        </div>
    );
}


export default RecommendationForm;