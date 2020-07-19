import React from 'react';

const ConfirmationModal = (props)=>{
     return(
         <div className="confirmation-modal-wrapper">
             <div className="question">You really want to delete this recommendation?</div>
             <div className="modal-btns-wrapper">
                 <button onClick={props.onDeleteRecommendation} className="yes-btn">
                     YES
                 </button>

                 <button onClick={props.hideModal} className="no-btn">
                     No
                 </button>
             </div>
         </div>
     )
}

export default ConfirmationModal;
