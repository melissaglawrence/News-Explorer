import React from 'react';

function Preloader(props) {
  return (
    <>
      {props.isNewsFailed ? (
        <div className='loading'>
          <div className='loading__failed_img' />
          <h3 className='loading__failed_title'>Nothing found</h3>
          <p className='loading__text'>
            Sorry, but nothing matched your search terms...
          </p>
        </div>
      ) : (
        <div className='loading'>
          <div className='loading__img' />
          <p className='loading__text'>Searching for news...</p>
        </div>
      )}
    </>
  );
}

export default Preloader;
