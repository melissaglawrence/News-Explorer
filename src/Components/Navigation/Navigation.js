import React from 'react';
import { Link } from 'react-router-dom';
import user from '../../images/User.svg';

function Navigation(props) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const handleOpenMenu = () => {
    setIsMenuOpen(true);
  };

  const handleCloseMenu = () => {
    setIsMenuOpen(false);
  };
  return (
    <>
      <nav className={`nav ${isMenuOpen ? 'nav__open_menu' : null}`}>
        <button
          className={`${
            props.text
              ? isMenuOpen
                ? 'nav__menu_close'
                : 'nav__menu'
              : isMenuOpen
              ? 'nav__menu_close_dark'
              : 'nav__menu_dark'
          }`}
          onClick={isMenuOpen ? handleCloseMenu : handleOpenMenu}
        />
        <Link
          to='/'
          className={`nav__link button ${
            props.text ? 'nav__light' : 'nav__dark'
          }`}
        >
          NewsExplorer
        </Link>
        <div className={`${isMenuOpen ? 'nav__open' : 'nav__hidden'}`}>
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
              <span
                className={`${
                  props.text ? 'nav__sign-out' : 'nav__sign-out_dark'
                }`}
              />
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
      </nav>
    </>
  );
}

export default Navigation;
