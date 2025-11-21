import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header(props) {
  return (
    <>
      <header className='header'>
        <Navigation
          onSignIn={props.onSignIn}
          isLoggedIn={props.isLoggedIn}
          onSavedArticles={props.onSavedArticles}
          onSignOut={props.onSignOut}
          isUser={props.isUser}
          username={props.username}
          text={true}
        />
        <h1 className='header__title'>What's going on in the world?</h1>
        <p className='header__text'>
          Find the latest news on any topic and save them to your account.
        </p>
        <SearchForm onSubmit={props.onSubmit} />
      </header>
    </>
  );
}

export default Header;
