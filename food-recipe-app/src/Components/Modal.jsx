import React from 'react';

// Modal component that takes `children` (content inside the modal) and `onClose` (function to close the modal) as props
const Modal = ({children, onClose}) => {
  return (
    <>
      {/* Backdrop: a transparent area that covers the screen, clicking on it closes the modal */}
      <div className='backdrop' onClick={onClose}> </div>
      {/* Modal box that contains the content */}
        <dialog className='modal' open>
          {/* This is where the passed content (children) will appear */}
            {children}
        </dialog>
      
    </>
  )
}

export default Modal; // Make the Modal component available to be used in other files
