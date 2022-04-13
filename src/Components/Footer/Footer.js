import React from 'react';
import { Link } from 'react-router-dom';
import github from '../../images/Github.svg';
import linkedin from '../../images/Linkedin.svg';

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
          <Link
            to='https://practicum.yandex.com/'
            className='footer__link button'
          >
            Practicum by Yandex
          </Link>
          <Link
            to='www.linkedin.com/in/melissaglawrence8'
            className='footer__link button'
          >
            <img src={linkedin} />
          </Link>
          <Link
            to='https://github.com/melissaglawrence'
            className='footer__link button'
          >
            <img src={github} />
          </Link>
        </div>
      </footer>
    </>
  );
}

export default Footer;
