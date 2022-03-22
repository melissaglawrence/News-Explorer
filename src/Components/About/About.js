import React from 'react';
import myPic from '../../images/myPic.jpeg';

function About() {
  return (
    <>
      <section className='about'>
        <div className='about__container'>
          <img className='about__img' src={myPic} />
          <div>
            <h1 className='about__name'>About</h1>
            <p className='about__text'>
              text text text text texttext text text text texttext text text
              texttext text text text text texttext text text text texttext text
              text text texttext text text text texttext text text text texttext
              text text text texttext text text text texttext text text text
              texttext text text text texttext text text text texttext text text
              text texttext text text text text
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
