import React from 'react';
import { FaCloseIcon } from './FaIcons';

import '../css/modal.css';

const Modal = ({handleClose, showModal, children})=>{
    const showHideClassName = showModal ? "modal display-block" : "modal display-none";  

    return (
        <div className={showHideClassName} id="modal">
            <section className="main-modal">
                <button onClick={handleClose} 
                        className="modal-close-btn">
                    <FaCloseIcon/>
                </button>
                {children}
                 
            </section>
        </div>
    )
};

export default Modal;