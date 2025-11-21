import React from 'react';

function PopupWithForm(props) {
  return (
    <>
      <section className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
        <div className='popup__container'>
          <button
            className='popup__close button'
            type='button'
            aria-label='Close'
            onClick={props.onClose}
          />
          <form
            className='popup__info'
            id={props.formId}
            name={props.formName}
            onSubmit={props.onSubmit}
          >
            <h2 className='popup__title'>{props.headerTitle}</h2>
            <>{props.children}</>
          </form>
        </div>
      </section>
    </>
  );
}

export default PopupWithForm;
