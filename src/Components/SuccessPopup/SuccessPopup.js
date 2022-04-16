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
        <h1 className='popup__title'>Registration successfully completed!</h1>
        <button
          className='form__link button'
          type='button'
          onClick={props.onSignIn}
        >
          Sign In
        </button>
      </div>
    </section>
  );
};

export default SuccessPopup;
