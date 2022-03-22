import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <>
      <footer className='footer'>
        <p className='footer__text'>
          &copy; 2021 Supersite, Powered by News API
        </p>
        <div>
          <Link to='/' className='footer__link button'>
            Home
          </Link>
          <Link to='/' className='footer__link button'>
            Practicum by Yandex
          </Link>
          <Link to='/' className='footer__link button'>
            <img src='' />
          </Link>
          <Link to='/' className='footer__link button'>
            <img src='' />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
