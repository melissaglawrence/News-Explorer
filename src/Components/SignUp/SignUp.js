import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

const SignUp = (props) => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [username, setUsername] = React.useState('');

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.onSignUpSubmit({ password, email, username });
    setUsername('');
    setPassword('');
    setEmail('');
  };
  return (
    <>
      <PopupWithForm
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
        formId='signUp'
        formName='signUp'
        headerTitle='Sign Up'
      >
        <div className='form__input-Container '>
          <label className='form__input-label' htmlFor='signUpEmailInput'>
            Email
          </label>
          <input
            className='form__input form__input_email'
            id='signUpEmailInput'
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
          <label className='form__input-label' htmlFor='signUpPasswordInput'>
            Password
          </label>
          <input
            className='form__input'
            id='signUpPasswordInput'
            placeholder='Enter password'
            name='password'
            type='password'
            onChange={handlePassword}
            value={password || ''}
            required
          />
          <span className='form__input-error'>{props.errorMessage}</span>
        </div>
        <div className='form__input-container'>
          <label className='form__input-label' htmlFor='signUpUsernameInput'>
            Username
          </label>
          <input
            className='form__input'
            id='signUpUsernameInput'
            placeholder='Enter username'
            name='username'
            type='username'
            onChange={handleUsername}
            value={username || ''}
            required
          />
          <span className='form__input-error'>{props.errorMessage}</span>
        </div>
        <button type='submit' className='form__save' aria-label='save'>
          Sign Up
        </button>
        <div className='form__redirect'>
          <p>or </p>
          <button
            className='form__link button'
            type='button'
            onClick={props.onSignIn}
          >
            Sign In
          </button>
        </div>
      </PopupWithForm>
    </>
  );
};

export default SignUp;
