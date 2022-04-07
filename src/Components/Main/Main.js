import React from 'react';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';

function Main(props) {
  return (
    <>
      <Header
        onSignIn={props.onSignIn}
        onSubmit={props.onSubmit}
        isLoggedIn={props.isLoggedIn}
        onSavedArticles={props.onSavedArticles}
        onSignOut={props.onSignOut}
        isUser={props.isUser}
        username={props.username}
      />
      {props.isNews ? (
        <NewsCardList
          isNewsSearch={props.isNewsSearch}
          news={props.news}
          isLoggedIn={props.isLoggedIn}
          tooltip={props.tooltip}
          onClick={props.onClick}
          isNewsSaved={props.isNewsSaved}
          signIn={props.signIn}
        />
      ) : null}
      <About />
      <Footer />
    </>
  );
}

export default Main;
