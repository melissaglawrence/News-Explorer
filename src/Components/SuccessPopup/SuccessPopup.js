import React from 'react';

const SuccessPopup = (props) => {
  return (
    <section
      className={`popup ${props.isOpen ? 'popup_opened' : ''}`}
      id='tooltip'
    >
      <div className='popup__container tooltip'>
        <button
          className='popup__close tooltip__close button'
          type='button'
          aria-label='Close'
          onClick={props.onClose}
        />
        <h1 className='tooltip__title'>Registration successfully completed!</h1>
        <button
          className='tooltip__link button'
          type='button'
          onClick={props.signIn}
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default SuccessPopup;
