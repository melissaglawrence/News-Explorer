import React from 'react';

function Preloader() {
  return (
    <>
      <div className='loading'>
        <div className='loading__img'></div>
        <p className='loading__text'>Searching for news...</p>
      </div>
      <div className='loading__failed'>
        <img className='loading__failed_img' src='' />
        <h3 className='loading__failed_title'>Nothing found</h3>
        <p className='loading__failed_text'>
          Sorry, but nothing matched your search terms...
        </p>
      </div>
    </>
  );
}

export default Preloader;
