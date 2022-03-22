import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const SignIn = (props) => {
  const [email, setEmail] = React.useState();
  const [password, setPassword] = React.useState();

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSignInSubmit({ password, email });
  };
  return (
    <>
      <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        formId='signIn'
        formName='signIn'
        headerTitle='Sign In'
      >
        <div className='form__input-Container'>
          <label className='form__input-label' htmlFor='signInEmailInput'>
            Email
          </label>
          <input
            className='form__input form__input_email'
            id='signInEmailInput'
            placeholder='Enter email'
            name='email'
            type='text'
            onChange={handleEmail}
            value={email || ''}
            required
          />
          <span className='form__input-error'>{props.errorMessage}</span>
        </div>
        <div className='form__input-container'>
          <label className='form__input-label' htmlFor='signInPasswordInput'>
            Password
          </label>
          <input
            className='form__input'
            id='signInPasswordInput'
            placeholder='Enter password'
            name='password'
            type='password'
            onChange={handlePassword}
            value={password || ''}
            required
          />
          <span className='form__input-error'>{props.errorMessage}</span>
        </div>
        <button type='submit' className='form__save button' aria-label='save'>
          Sign In
        </button>
        <div className='form__redirect'>
          <p>or </p>
          <button
            className='form__link button'
            type='button'
            onClick={props.onSignUp}
          >
            Sign Up
          </button>
        </div>
      </PopupWithForm>
    </>
  );
};

export default SignIn;
