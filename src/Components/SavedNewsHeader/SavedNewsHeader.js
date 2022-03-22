import React from 'react';
import { Link } from 'react-router-dom';
import Navigation from '../Navigation/Navigation';
import NewsCardList from '../NewsCardList/NewsCardList';

function SavedNewsHeader(props) {
  return (
    <>
      <Navigation
        isLoggedIn={props.isLoggedIn}
        username={props.username}
        onClick={props.onSignOut}
        text={false}
      />
      <div className='saved'>
        <p className='saved__text'>Saved articles</p>
        <h1 className='saved__title'>
          {props.username} you have {props.savedArticleLength} saved articles
        </h1>
      </div>
    </>
  );
}

export default SavedNewsHeader;
