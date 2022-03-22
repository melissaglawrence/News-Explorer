import React from 'react';
import { Link } from 'react-router-dom';
import user from '../../images/User.svg';

function Navigation(props) {
  return (
    <>
      <div className='nav'>
        <Link
          to='/'
          className={`nav__link button ${
            props.text ? 'nav__light' : 'nav__dark'
          }`}
        >
          NewsExplorer
        </Link>
        <div>
          <Link
            to='/'
            className={`nav__link button ${
              props.text ? 'nav__light' : 'nav__dark'
            }`}
          >
            Home
          </Link>

          {props.isLoggedIn ? (
            <Link
              to='/articles'
              className={`nav__link button ${
                props.text ? 'nav__light' : 'nav__dark'
              }`}
              onClick={props.onSavedArticles}
            >
              Saved Articles
            </Link>
          ) : null}
          {props.isLoggedIn ? (
            <Link
              to='/'
              className={`nav__link button ${
                props.text ? 'nav__light' : 'nav__dark'
              }`}
              onClick={props.onSignOut}
            >
              {props.username}
              <span className='nav__sign-out' />
            </Link>
          ) : (
            <Link
              to='/'
              className={`nav__link button ${
                props.text ? 'nav__light' : 'nav__dark'
              }`}
              onClick={props.onSignIn}
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </>
  );
}

export default Navigation;
