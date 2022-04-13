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
              My name is Melissa Lawrence, I am currently a web developer
              student at Practicum. I have experience with Javascript, React,
              ExpressJS, MongoDB and more.
            </p>
            <p className='about__text'>
              At Practicum, they have taught me a lot of useful skills like how
              to write clean and readable code. My favorite part about being
              apart of this program is having projects to complete with each
              step. Then having those projects reviewed by professional
              developers.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
