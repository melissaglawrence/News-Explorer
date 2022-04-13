import React from 'react';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import NewsCard from '../NewsCard/NewsCard';

function SavedNews(props) {
  return (
    <>
      <SavedNewsHeader
        savedArticleLength={props.savedArticleLength}
        username={props.username}
        SavedArticleTags={props.savedArticleTags}
        isLoggedIn={props.isLoggedIn}
        onSignOut={props.onSignOut}
      />
      <section className='news'>
        <ul className='news__list'>
          {props.news.map((article, index) => {
            return (
              <NewsCard
                key={index}
                publishedAt={article.date}
                link={article.link}
                image={article.image}
                title={article.title}
                content={article.text}
                tag={article.source}
                news={article}
                isLoggedIn={props.isLoggedIn}
                tooltip={props.tooltip}
                isNewsSaved={props.isNewsSaved}
                onClick={props.onClick}
                isNewsSearch={false}
              />
            );
          })}
        </ul>
      </section>
      <Footer />
    </>
  );
}

export default SavedNews;
